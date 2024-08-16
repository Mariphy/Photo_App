const express = require('express');
const UserService = require('../services/userService')
const router = express.Router();
const sequelize = require('../config/index')

/*
const getUserById = require('../controllers/userController');

router.get('/:id', (req, res) => {
    console.log('Test passed')
});
*/
const userService = new UserService(sequelize);

router.post('/create', async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).send(user);
    } catch(error) {
        return next(error);
    }
})

module.exports = router;