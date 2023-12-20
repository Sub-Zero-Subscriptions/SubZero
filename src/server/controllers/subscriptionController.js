import db from '../models/model.js';

const subscriptionController = {};

subscriptionController.findSub = async (req, res, next) => {
  try {
    const { subname, user_id } = req.params;
    if (!subname || !user_id) throw new Error('All fields are required');
    const subData = `SELECT * FROM subscriptions WHERE subname = $1 and user_id = $2`;
    const queryParams = [subname, user_id];
    const response = await db.query(subData, queryParams);
    res.locals.currentSub = response.rows;
    return next();
  } catch (error) {
    return next({
      log: 'Error at subscriptionController.findSub',
      message: { err: 'Error finding subscription with provided id' },
    });
  }
};

subscriptionController.addNewSub = async (req, res, next) => {
  try {
    const requiredProperties = [
      'user_id',
      'subname',
      'subbuydate',
      'subenddate',
      'amountcharged',
    ];

    const newSubscription = req.body;

    for (const prop of requiredProperties) {
      if (
        !newSubscription.hasOwnProperty(prop) ||
        newSubscription[prop] === undefined
      ) {
        throw new Error('All subscription fields are required');
      }
    }

    const newSubData = `INSERT INTO subscriptions (user_id, subname, subbuydate, subenddate, amountcharged) VALUES($1, $2, $3, $4, $5)`;

    const queryParams = [
      newSubscription.user_id,
      newSubscription.subname,
      newSubscription.subbuydate,
      newSubscription.subenddate,
      newSubscription.amountcharged,
    ];

    await db.query(newSubData, queryParams);
    return next();
  } catch (error) {
    console.log(error);
    return next({
      log: 'Error at subscriptionController.addNewSub',
      message: { err: 'Subscription data incomplete' },
    });
  }
};

subscriptionController.editSub = async (req, res, next) => {
  try {
    const updatedSubscription = req.body;

    const originalSubData = `SELECT * FROM subscriptions WHERE sub_id = $1`;
    const queryParam1 = [updatedSubscription.sub_id];
    let originalSub = await db.query(originalSubData, queryParam1);
    originalSub = originalSub.rows[0];
    console.log(originalSub);

    for (let key in updatedSubscription) {
      originalSub[key] = updatedSubscription[key];
    }

    const updatedSubData = `UPDATE subscriptions SET subname = $1, subbuydate = $2, subenddate = $3, amountcharged = $4 WHERE sub_id = $5`;

    const queryParams = [
      originalSub.subname,
      originalSub.subbuydate,
      originalSub.subenddate,
      originalSub.amountcharged,
      originalSub.sub_id,
    ];

    await db.query(updatedSubData, queryParams);
    return next();
  } catch (error) {
    return next({
      log: 'Error at subscriptionController.editSub',
      message: { err: 'Error updating subscription' },
    });
  }
};

subscriptionController.deleteSub = async (req, res, next) => {
  try {
    const { sub_id } = req.body;
    if (!sub_id) throw new Error('A subscription id is required');
    const subDelete = `DELETE FROM subscriptions WHERE sub_id = $1`;
    const queryParams = [sub_id];
    await db.query(subDelete, queryParams);
    return next();
  } catch (error) {
    return next({
      log: 'Error at subscriptionController.deleteSub',
      message: { err: 'Error deleting subscription' },
    });
  }
};

subscriptionController.retrieveAllSubs = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    if (!user_id) throw new Error('A user id is required');
    const subData = `SELECT * FROM subscriptions WHERE user_id = $1`;
    const queryParams = [user_id];
    const response = await db.query(subData, queryParams);
    res.locals.allSubs = response.rows;
    return next();
  } catch (error) {
    return next({
      log: 'Error at subscriptionController.retrieveAllSubs',
      message: { err: 'Error retrieving all subscriptions' },
    });
  }
};

export default subscriptionController;
