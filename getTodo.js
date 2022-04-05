const successHandle = require("./successHandle");

function getTodo(res, todos) {
  successHandle(res, todos);
}

module.exports = getTodo;
