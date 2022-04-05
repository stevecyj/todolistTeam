const successHandle = require("./successHandle");

function deleteTodo(res, todos) {
    todos.length = 0;
  successHandle(res, todos);
}

module.exports = deleteTodo;