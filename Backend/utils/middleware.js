const requestLogger = (request, response, next) => {
  const log = `${request.method} - ${request.path}`;
  if (Object.keys(request.body).length === 0) {
    console.log(log);
  } else {
    console.log(log, request.body);
  }
  console.log(request);

  next();
};

module.exports = { requestLogger };
