import express from 'express';
import subscriptionController from '../controllers/subscriptionController.js';
const subscriptionRouter = express.Router();

// Create New Subscription
subscriptionRouter.post(
  '/create',
  subscriptionController.addNewSub,
  (req, res, next) => {
    return res.status(200).send('New subscription added.');
  }
);

// Update Subscription
subscriptionRouter.patch(
  '/edit',
  subscriptionController.editSub,
  (req, res, next) => {
    return res.status(200).send('Subscription updated.');
  }
);

// Delete Subscription
subscriptionRouter.delete(
  '/delete',
  subscriptionController.deleteSub,
  (req, res, next) => {
    return res.status(200).send(`Subscription deleted.`);
  }
);

// Find Subscription
subscriptionRouter.get(
  '/filter/:user_id/:subname',
  subscriptionController.findSub,
  (req, res, next) => {
    return res.status(200).json(res.locals.currentSub);
  }
);

export default subscriptionRouter;
