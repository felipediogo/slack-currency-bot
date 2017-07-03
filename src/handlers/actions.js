const log = (event) => {
  console.log(`actionss -> ${JSON.stringify(event, null, 2)}`);
  return Promise.resolve(true);
};

module.exports.handle = (event, context, next) =>
  log(event)
    .then(() => next())
    .catch((err) => next(err));
