import express from 'express';
const subscriptionRouter = express.Router();

// Create New Subscription
subscriptionRouter.post('/create', (req, res, next) => {
  return res.status(200).send('New subscription created!');
});

// Update Subscription
subscriptionRouter.patch('/edit', (req, res, next) => {
  return res.status(200).send('Subscription updated!');
});

// Delete Subscription
subscriptionRouter.delete('/delete', (req, res, next) => {
  return res.status(200).send('Subscription deleted!');
});

// Find Subscription
subscriptionRouter.get('/filter', (req, res, next) => {
  return res.status(200).send('Subscription found!');
});

export default subscriptionRouter;
