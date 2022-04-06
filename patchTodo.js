const successHandle = require('./successHandle');
const errorHandle = require('./errorHandle');

function patchTodo(req, res, todos) {
  req.on('end', ()=>{
    try{
      const id = req.url.split('/').pop();
      const todo = JSON.parse(body).title;
      const index = todos.findIndex(item => item.id === id);
      console.log('id: ', id, 'todo: ', todo, 'index: ', index);
      if(todo !==  undefined && index !== -1) {
        todos[index].title = todo;
        successHandle(res, todos);
      }
      else{
        errorHandle(res);
      }
      res.end();
    }
    catch(error) {
      errorHandle(res);
    }
  });
}

module.exports = patchTodo;