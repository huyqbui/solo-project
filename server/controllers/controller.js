const mongodb = require('../mongoose/db');

const controller = {};

controller.addChannel = async (req, res, next) => {
  try {
  const body = req.body;
  const newChannel = await mongodb.Model.create(body);
  res.locals.newChannel = newChannel;
  return next();
  } catch(err) {
    return next({
      log: 'addChannel: ERROR: Error adding Channel to database',
      message: {
        err: 'Error occurred in addChannel. Check server logs for more details.',
      },
    });
  }
}


module.exports = controller;