// const utilDebug= require('debugg')('util_handleLog:debug');
const logger = require("./logger");

function handleLog(message) {
  logger.info(message);
}

function handleSuccessResponse(message, model, res, stausCode = 200) {
  if (model) res.status(stausCode).send(model);
  else res.status(stausCode).send(message);

  handleLog(message);
}

function handleErrorResponse(message, res, stausCode = 404) {
  logger.error(message);
  res.status(stausCode).send(message);
}

function handleSevereErrorResponse(message) {
  logger.error(message);
  process.exit(1);
}

module.exports = {
  handleSuccessResponse,
  handleErrorResponse,
  handleSevereErrorResponse,
  handleLog,
};
