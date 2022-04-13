const Todos = require('./model/todo.js');
const successHandle = require('./successHandle');
const errorHandle = require('./errorHandle');

function patchTodo(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async ()=>{
    try{
      const id = req.url.split('/').pop();
      const todo = JSON.parse(body);
      const todos = await Todos.findByIdAndUpdate(id, todo);
      successHandle(res, todos);
    }
    catch(error) {
      errorHandle(res);
    }
  });
}

module.exports = patchTodo;