import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import OAuth2Strategy from 'passport-oauth2';
import User from '../models/sequelize/user.js';
import { comparePassword } from '../utils/hash.js';
import oauth from './oauth.js';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

/*
//development URLs
passport.use(new OAuth2Strategy({
  authorizationURL: 'http://localhost:4001/oauth2/authorize',
  tokenURL: 'http://localhost:4001/oauth2/token',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:4001/api/users/auth/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await oauth.model.getUser(profile.email, profile.password);
      if (!user) {
        return done(null, false, { message: 'User not found.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
}));
*/

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;