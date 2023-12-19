import express from 'express';
import subscriptionController from '../controllers/subscriptionController.js';
const userRouter = express.Router();

// User Login
userRouter.post(
  '/login',
  subscriptionController.retrieveAllSubs,
  (req, res, next) => {
    return res.status(200).send('You are logged in!');
  }
);

// Create Account
userRouter.post('/signup', (req, res, next) => {
  return res.status(200).send('You are signed up!');
});

export default userRouter;
