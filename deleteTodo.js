const Todos = require("./model/todo");
const successHandle = require("./successHandle");
const errorHandle = require("./errorHandle");

async function deleteTodo(res, todos, req = null) {
  if (!req) {
    todos.length = 0;
    successHandle(res, todos);
  } else {
    try {
      const id = req.url?.split("/")?.pop();
      const result = await Todos.findByIdAndDelete(id);

      successHandle(res, result);
    } catch (error) {
      errorHandle(res);
    }
  }
}

module.exports = deleteTodo;
