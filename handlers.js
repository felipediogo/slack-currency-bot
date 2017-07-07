'use strict';

const install = require('./src/handlers/install');
const events = require('./src/handlers/events');
const actions = require('./src/handlers/actions');

module.exports.install = (event, context, callback) => install.handle(event, context, callback);

module.exports.events = (event, context, callback) => events.handle(event, context, callback);

module.exports.actions = (event, context, next) => actions.handle(event, context, next);
