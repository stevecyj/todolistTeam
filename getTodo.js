const Todos = require("./model/todo");
const successHandle = require("./successHandle");
const errorHandle = require("./errorHandle");

async function getTodo(req, res) {
  try {
    const todos = await Todos.find();
    successHandle(res, todos);
  } catch (error) {
    errorHandle(res);
  }
}

module.exports = getTodo;
