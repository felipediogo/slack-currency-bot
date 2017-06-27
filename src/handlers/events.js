/* eslint-disable no-console */
const AWS = require('aws-sdk');

const lambda = AWS.Lambda();
const dynamodb = new AWS.DynamoDB.DocumentClient();

const getSlackEvent = event => ({ slack: JSON.parse(event.body) });

const respond = callback => (event) => {
  const response = { statusCode: 200 };
  if (event.slack.type === 'url_verification') {
    response.body = event.slack.challenge;
  }
  callback(null, response);
  return event;
};

const verifyToken = (event) => {
  if (event.slack.token !== process.env.VERIFICATION_TOKEN) {
    throw new Error('Invalid slack token');
  }
  return event;
};

const getTeam = (event) => {
  const params = {
    TableName: process.env.TEAMS_TABLE,
    Key: {
      team_id: event.slack.team_id
    }
  };
  console.log(`dynamodb get -> ${params}`);
  return dynamodb.get(params).promise()
    .then(data => Object.assign(event, {team: data.Item}));
};

const isBotMentioned = (botUserId, message) => new RegExp(`^<@${botUserId}>.*$`).test(message);

const checkForMention = (event) => {
  const message = event.slack.event.text;
  const botUserId = event.team.bot.bot_user_id;
  if (isBotMentioned(botUserId, message)) {
    console.log(`bot ${botUserId} mentioned in -> ${message}`);
    console.log(`here's the object -> ${JSON.stringify}`);
    return event;
  }
};

const actionName = () => `${process.env.NAMESPACE}-action`;
const invokeAction = (event) => {
  console.log(`Invoking function -> ${actionName}, with ${event}`);
  return lambda.invoke({
    FunctionName: actionName,
    InvocationType: 'Event',
    LogType: 'None',
    Payload: JSON.stringify(event)
  });
};

module.exports.handle = (event, context, callback) =>
  Promise.resolve(event)
    .then(getSlackEvent)
    .then(respond(callback))
    .then(verifyToken)
    .then(getTeam)
    .then(checkForMention)
    .then(invokeAction)
    .catch(callback);
