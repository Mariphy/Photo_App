const express = require('express');
const sequelize = require('./config/sequelize');
require('dotenv').config();
const app = express();
const userRouter = require('./routes/users');
const photoRouter = require('./routes/photos');
const passport = require('./config/passport'); 
const session = require('express-session');
const helmet = require('helmet');
const PORT = process.env.PORT || 4001;

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
        return sequelize;
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


module.exports = app;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});