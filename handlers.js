'use strict';

const install = require('./src/handlers/install');
const events = require('./src/handlers/events');
const actions = require('./src/handlers/actions');

module.exports.install = install.handle;
module.exports.events = events.handle;
module.exports.actions = actions.handle;
