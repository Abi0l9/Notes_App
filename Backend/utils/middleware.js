const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  const log = `${request.method} - ${request.path}`;
  if (Object.keys(request.body).length === 0) {
    console.log(log);
  } else {
    console.log(log, "---", request.body);
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  console.log(error.name);
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "Authentication needed...invalid token/ token is missing",
    });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error: "Invalid Data",
    });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7);
  }

  next();
};

const userExtractor = (request, response, next) => {
  const token = request.token;
  const verifyToken = jwt.verify(request.token, process.env.SECRET);
  request.user = verifyToken.id;

  next();
};

module.exports = { requestLogger, tokenExtractor, userExtractor, errorHandler };
