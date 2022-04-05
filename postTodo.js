const successHandle = require("./successHandle");
const errHandle = require("./errorHandle");
const { v4: uuidv4 } = require("uuid");

function postTodo(req, res, todos) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    // 異常行為
    try {
      const title = JSON.parse(body).title;
      if (title !== undefined) {
        // console.log(title);
        const todo = {
          id: uuidv4(),
          title,
        };
        todos.push(todo);
        // console.log(todos);

        successHandle(res, todos);
      } else {
        errHandle(res);
      }
    } catch (error) {
      // console.log(error);
      errHandle(res);
    }
  });
}

module.exports = postTodo;
