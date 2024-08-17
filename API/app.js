const express = require('express');
const sequelize = require('./config');
require('dotenv').config();
const app = express();
const userRouter = require('./routes/users')

app.use(express.urlencoded({extended: true}));
app.use(express.json());

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



module.exports = app;

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});