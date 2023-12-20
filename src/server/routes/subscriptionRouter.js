import express from 'express';
import subscriptionController from '../controllers/subscriptionController.js';
const subscriptionRouter = express.Router();

// Create New Subscription
subscriptionRouter.post(
  '/create',
  subscriptionController.generateSubId,
  subscriptionController.addNewSub,
  (req, res, next) => {
    return res.status(200).json(res.locals.newSub);
  }
);

// Update Subscription
subscriptionRouter.patch(
  '/edit',
  subscriptionController.findSub,
  subscriptionController.editSub,
  (req, res, next) => {
    return res.status(200).json(res.locals.updatedSub);
  }
);

// Delete Subscription
subscriptionRouter.delete(
  '/delete',
  subscriptionController.deleteSub,
  (req, res, next) => {
    return res
      .status(200)
      .send(
        `The following subscription has been deleted: ${res.locals.deletedSub}`
      );
  }
);

// Find Subscription
subscriptionRouter.get(
  '/filter',
  subscriptionController.findSub,
  (req, res, next) => {
    return res.status(200).json(res.locals.currentSub);
  }
);

export default subscriptionRouter;
