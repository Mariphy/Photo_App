const express = require('express');
const UserService = require('../services/userService')
const router = express.Router();
const sequelize = require('../config/index');
const User = require('../models/sequelize/index');

const userService = new UserService(sequelize);

router.get('/', (req, res) => {
    User.findAll()
      .then(users => {
        console.log(users);
        res.status(200).json(users);
      }) 
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
      });
});    

router.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).send(user);
  } catch(error) {
    res.status(500);
    console.log(error);
  }
});  

router.put('/:id', async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).send(user);
  } catch(error) {
    res.status(500);
    console.log(error);
  }
});  

router.post('/create', async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).send(user);
    } catch(error) {
        console.log(error);
        //throw new Error('Error creating user');
    }
})

module.exports = router;