const {
  handleErrorResponse,
  handleSuccessResponse
} = require("./handleLog");

function getId(req, res) {
  let id = parseInt(req.params.id) || 0;

  if (!id || id <= 0)
    return handleErrorResponse(
      `Invalid id:${id}`,
      res
    );

  return id;
}

function getBodyParam(param, req, res) {
  if (!req.body[param]) return (value = "");

  value = req.body[param];

  if (value.length < 1)
    return handleErrorResponse(
      `Invalid ${param} name.Cannot update at id:${id}`,
      res
    );

  return value;
}

function getQueryParam(param, req, res) {
  if (!req) return (value = "");

  value = req.query[param];

  if (value.length < 1)
    return handleErrorResponse(
      `Invalid ${param} name.Cannot update at id:${id}`,
      res
    );

  return value;
}


module.exports = {
  getBodyParam,
  getId,
  getQueryParam
};