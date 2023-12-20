import express from 'express';
import subscriptionController from '../controllers/subscriptionController.js';
import userController from '../controllers/userController.js';
const userRouter = express.Router();

// User Login
userRouter.post(
  '/login',
  userController.authUser,
  subscriptionController.retrieveAllSubs,
  (req, res, next) => {
    return res.status(200).json(res.locals.allSubs);
  }
);

// Create Account
userRouter.post('/signup', userController.signUp, (req, res, next) => {
  return res.status(200).json('You are signed up!');
});

export default userRouter;
