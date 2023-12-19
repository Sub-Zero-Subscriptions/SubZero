const subscriptionController = {};

subscriptionController.retrieveAllSubs = (req, res, next) => {
  console.log('All subs retrieved!');
  return next();
};

export default subscriptionController;
