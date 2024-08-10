const express = require('express');
const userService = require('../services/userService')
const router = express.Router();

const getUserById = require('../controllers/userController');

router.get('/:id', (req, res) => {
    console.log('Test passed')
});

module.exports = router;