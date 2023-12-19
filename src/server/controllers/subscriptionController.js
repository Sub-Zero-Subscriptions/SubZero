import crypto from 'crypto';

// Replace with database model
const subsDatabase = {};

const subscriptionController = {};

subscriptionController.generateSubId = (req, res, next) => {
  try {
    const subId = crypto.randomUUID();
    res.locals.subId = subId;
    return next();
  } catch (error) {
    return next({
      log: 'Error at subscriptionController.generateSubId',
      message: { err: 'Error generating subscription id' },
    });
  }
};

subscriptionController.findSub = async (req, res, next) => {
  try {
    const { subname } = req.body;
    if (!subname) throw new Error('A subscription name is required');
    const subData = `SELECT * FROM subscriptions WHERE subname = ${subname}`;
    const response = await subsDatabase.query(subData);
    res.locals.currentSub = response.rows[0];
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
      'sub_id',
      'user_id',
      'subname',
      'subbuydate',
      'subenddate',
      'amountcharged',
    ];

    const newSubscription = req.body;
    newSubscription.sub_id = res.locals.subId;

    for (const prop of requiredProperties) {
      if (
        !newSubscription.hasOwnProperty(prop) ||
        newSubscription[prop] === undefined
      ) {
        throw new Error('All subscription fields are required');
      }
    }

    const newSubData = `INSERT INTO subscriptions (sub_id, user_id, subname, subbuydate, subenddate, amountcharged) VALUES(${newUser.sub_id}, ${newSub.user_id}, ${newSub.subname}, ${newSub.subbuydate}, ${newSub.subenddate}, ${newSub.amountcharged}) RETURNING *`;

    const response = await subsDatabase.query(newSubData);
    res.locals.newSub = response.rows[0];

    return next();
  } catch (error) {
    return next({
      log: 'Error at subscriptionController.addNewSub',
      message: { err: 'Subscription data incomplete' },
    });
  }
};

subscriptionController.editSub = async (req, res, next) => {
  try {
    const originalSub = res.locals.currentSub;
    const updatedSubscription = req.body;

    for (let key in updatedSubscription) {
      originalSub[key] = updatedSubscription[key];
    }

    const updatedSubData = `UPDATE subscriptions SET subname = ${originalSub.subname} subbuydate = ${originalSub.subbuydate} subenddate = ${originalSub.subenddate} amountcharged = ${originalSub.amountcharged} WHERE sub_id = ${originalSub.sub_id}`;

    const response = await subsDatabase.query(updatedSubData);
    res.locals.updatedSub = response.rows[0];
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
    const subDelete = `DELETE FROM subscriptions WHERE sub_id = ${sub_id}`;
    const response = await subsDatabase.query(subDelete);
    res.locals.deletedSub = response.rows[0];
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
    const user_id = req.body._id;
    if (!user_id) throw new Error('A user id is required');
    const subData = `SELECT * FROM subscriptions WHERE user_id = ${user_id}`;
    const response = await subsDatabase.query(subData);
    res.locals.allSubs = response.rows[0];
    return next();
  } catch (error) {
    return next({
      log: 'Error at subscriptionController.retrieveAllSubs',
      message: { err: 'Error retrieving all subscriptions' },
    });
  }
};

export default subscriptionController;
