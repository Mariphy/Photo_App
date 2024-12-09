import { Router } from 'express';
import UserService from '../services/userService.js';
import sequelize from '../config/sequelize.js';
import passport from 'passport';

const userRouter = Router();
const userService = new UserService(sequelize);

userRouter.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await userService.createUser({ firstName, lastName, email, password });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

/*
//Passport redirects the user to http://localhost:4001/oauth2/authorize
userRouter.get('/auth/oauth2', passport.authenticate('oauth2'));

userRouter.get('/auth/callback', passport.authenticate('oauth2', {
  successRedirect: '/api/users/profile',
  failureRedirect: '/api/users/login',
}));
*/

userRouter.post('/login', passport.authenticate('local', {
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
  res.send('Logged-in Page');
}); 

userRouter.get('/', async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch(error) {
    res.status(500).send('Error fetching user');
  }
});    

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).send(user);
  } catch(error) {
    res.status(500).send('Error updating user');
  }
});  

userRouter.put('/:id', passport.authenticate('local', { session: false }), async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send('Error updating user');
  }
}); 

userRouter.delete('/:id', passport.authenticate('local', { session: false }), async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).send('User deleted');
  } catch (error) {
    res.status(500);
  }
});

export default userRouter;