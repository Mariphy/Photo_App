const express = require('express');
const UserService = require('../services/userService')
const userRouter = express.Router();
const sequelize = require('../config/index');
const User = require('../models/sequelize/index');

const userService = new UserService(sequelize);

userRouter.get('/', async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch(error) {
    res.status(500);
    console.log(error);
  }
});    

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).send(user);
  } catch(error) {
    res.status(500);
    console.log(error);
  }
});  

userRouter.put('/:id', async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).send(user);
  } catch(error) {
    res.status(500);
    console.log(error);
  }
});  

userRouter.post('/', async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).send(user);
    } catch(error) {
        throw new Error('Error creating user');
    }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).send('User deleted');
  } catch(error) {
    res.status(500);
    console.log(error);
  }
});  

module.exports = userRouter;