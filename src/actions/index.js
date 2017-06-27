const log = (event) => {
  console.log(`Logging Event -> ${JSON.stringify(event)}`);
  return Promise.resolve(event);
};

module.exports.handle = (event, context, callback) => log(event)
  .then(() => callback(null))
  .catch(callback);