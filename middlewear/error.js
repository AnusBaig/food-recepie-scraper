const {
  handleErrorResponse,
} = require('../utils/handleLog');

module.exports = function (req, res, next) {
  handleErrorResponse(new Error('Something Failed in the server...'), res, 500);
};