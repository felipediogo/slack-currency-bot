const log = (event) => {
  console.log(`Logging Event -> ${JSON.stringify(event)}`);
  return Promise.resolve(event);
};

const getCommand = (text) => /^<@[A-Z0-9]*>(.+)/.exec(text)[1].trim();

const commandToData = (command) => {
  const pattern = /[a-z\s]*(\d+).*([a-z]{3}).*([a-z]{3})/i;
  const matches = command.match(pattern);

  console.log(`matches -> ${matches}`);

  if (matches) {
    return {
      amount: +matches[1],
      source: +matches[2],
      target: +matches[3],
    };
  }
  return null;
};

const assignReply = (reply, event) => Object.assign(event, { reply });

const callFixerApi = (data) => {
  return null;
}

const doCommand = (event) => {
  const rawText = event.slack.event.text;
  const command = getCommand(rawText);

  const data = commandToData(command);

  if (data) {
    return assignReply(data);
  } else {
    return assignReply(`I'm sorry, I don't understand the command "${rawText}"`);
  }

};

module.exports.handle = (event, context, callback) => log(event)
  .then(doCommand)
  .then(log)
  .then(() => callback(null))
  .catch(callback);