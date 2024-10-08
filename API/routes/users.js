import { Router } from 'express';
import UserService from '../services/userService';
const userRouter = Router();
import sequelize from '../config/sequelize';
import User from '../models/sequelize/user';
import { authenticate } from 'passport';
import { hashPassword } from '../utils/hash';

const userService = new UserService(sequelize);

userRouter.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await userService.createUser({ firstName, lastName, email, password: hashedPassword });
    res.status(201).send(user);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Error creating user');
  }
});

//Passport redirects the user to http://localhost:4001/oauth2/authorize
userRouter.get('/auth/oauth2', authenticate('oauth2'));

userRouter.get('/auth/callback', authenticate('oauth2', {
  successRedirect: '/api/users/profile',
  failureRedirect: '/api/users/login',
}));

userRouter.post('/login', authenticate('local', {
  successRedirect: '/api/users/profile',
  failureRedirect: '/api/users/login',
}));

userRouter.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/api/users/login');
  }
  res.send(`Hello, ${req.user.firstName}`);
});

userRouter.get('/login', (req, res) => {
  res.send('Login Page');
}); 

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
    console.log('req.params.id', req.params.id)
    const user = await userService.getUserById(req.params.id);
    res.status(200).send(user);
  } catch(error) {
    res.status(500);
    console.log(error);
  }
});  

userRouter.put('/:id', authenticate('local', { session: false }), async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}); 

userRouter.delete('/:id', authenticate('local', { session: false }), async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).send('User deleted');
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

export default userRouter;