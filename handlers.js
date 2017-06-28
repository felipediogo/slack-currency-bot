'use strict';

const install = require('./src/handlers/install');
const events = require('./src/handlers/events');
const actions = require('./src/actions/currencyAction');

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
  callback(null, response);
};

module.exports.install = (event, context, callback) => install.handle(event, context, callback);

module.exports.events = (event, context, callback) => events.handle(event, context, callback);

module.exports.actions = (event, context, callback) => actions.handle(event, context, callback);