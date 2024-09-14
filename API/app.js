const express = require('express');
const sequelize = require('./config/sequelize');
require('dotenv').config();
const userRouter = require('./routes/users');
const photoRouter = require('./routes/photos');
const passport = require('./config/passport'); 
const session = require('express-session');
const helmet = require('helmet');
const OAuth2Server = require('@node-oauth/oauth2-server');
const oauth = require('./config/oauth');

const PORT = process.env.PORT || 4001;
const app = express();

app.oauth = new OAuth2Server({
    model: oauth.model,
    grants: ['authorization_code', 'password', 'refresh_token'],
    accessTokenLifetime: 3600,
    refreshTokenLifetime: 1209600
});

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const store = new session.MemoryStore();
app.use(
  session ({
  secret: process.env.SESSION_SECRET,
  cookie: {maxAge: 86400000, 
    //secure: true,      //uncomment for production, use https
    sameSite: "none"},
  saveUninitialized: false,
  resave: false,
  store
}));
app.use(passport.initialize());
app.use(passport.session());

async function connectToPostgres() {
    try {
        await sequelize.authenticate();
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

app.get('/oauth2/authorize', (req, res) => {
    res.send('Authorization Page');
  });
  
 app.post('/oauth2/token', async (req, res, next) => {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);

    try {
        const token = await app.oauth.token(req, res);
        res.json(token);
    } catch (err) {
        res.status(err.code || 500).json(err);
    }
});

module.exports = app;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});