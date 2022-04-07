const successHandle = require("./successHandle");
const errorHandle = require("./errorHandle");

function deleteTodo(res, todos, req = null) {
  if (!req) {
    todos.length = 0;
    successHandle(res, todos);
  } else {
    try {
      const id = req.url?.split("/")?.pop();
      const index = todos.findIndex((element) => element.id === id);
      if (index === -1) {
        errorHandle(res);
      } else {
        todos.splice(index, 1);
        successHandle(res, todos);
      }
    } catch (error) {
      errorHandle(res);
    }
  }
}

module.exports = deleteTodo;
