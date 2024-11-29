import express, { urlencoded, json } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import userRouter from './routes/users.js';
import photoRouter from './routes/photos.js';
import './config/passport.js';
import session, { MemoryStore } from 'express-session';
import helmet from 'helmet';
//import OAuth2Server, { Request, Response } from '@node-oauth/oauth2-server';
//import { model as _model } from './config/oauth.js';

dotenv.config();

const PORT = process.env.PORT || 4001;
const app = express();

/*
app.oauth = new OAuth2Server({
    model: _model,
    grants: ['authorization_code', 'password', 'refresh_token'],
    accessTokenLifetime: 3600,
    refreshTokenLifetime: 1209600
});
*/

app.use(helmet());
app.use(urlencoded({extended: true}));
app.use(json());
app.use(
  session ({
  secret: process.env.SESSION_SECRET,
  cookie: {maxAge: 86400000, 
    //secure: true,      //uncomment for production, use https
    sameSite: "none"},
  saveUninitialized: false,
  resave: false,
  store: new MemoryStore()
}));
app.use(passport.initialize());
app.use(passport.session());


async function connectToPostgres() {
    try {
        await passport.authenticate();
        console.log('Connection has been established successfully.');
        return ('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectToPostgres();


app.use('/api/users', userRouter);
app.use('/api/photos', photoRouter);
app.get('/', (req, res) => {
    res.send('Test');
});

/*
app.get('/oauth2/authorize', (req, res) => {
    res.send('Authorization Page');
  });
  
 app.post('/oauth2/token', async (req, res, next) => {
    const request = new Request(req);
    const response = new Response(res);

    try {
        const token = await app.oauth.token(req, res);
        res.json(token);
    } catch (err) {
        res.status(err.code || 500).json(err);
    }
});
*/

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

export default app;