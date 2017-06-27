const getCode = (event) => {
  var code = null;
  if (event.queryStringParameters && event.queryStringParameters.code) {
    code = event.queryStringParameters.code;
  }
  return code;
};

module.exports = {
  getCode
};
