const logger = require('../config/logger');

const loggingMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

const errorHandlingMiddleware = (err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send('Something went wrong!');
};

module.exports = { loggingMiddleware, errorHandlingMiddleware };