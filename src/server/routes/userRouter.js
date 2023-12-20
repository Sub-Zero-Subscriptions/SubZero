import express from 'express';
import subscriptionController from '../controllers/subscriptionController.js';
import authcontroller from './controllers/authController.js';
const userRouter = express.Router();

// User Login
userRouter.post(
  '/login',
  subscriptionController.retrieveAllSubs,
  (req, res, next) => {
    return res.status(200).json(res.locals.allSubs);
  }
);

// Create Account
userRouter.post('/signup', (req, res, next) => {
  return res.status(200).send('You are signed up!');
});

export default userRouter;
