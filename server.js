const { log } = require("console");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const successHandle = require("./successHandle");
const errHandle = require("./errorHandle");
const getTodo = require("./getTodo");
const postTodo = require("./postTodo");
const deleteTodo = require("./deleteTodo");
const patchTodo = require("./patchTodo");
const todos = [];

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB) // 連線資料庫
  .then(() => {
    console.log("資料庫連線成功");
  })
  .catch((error) => {
    console.log(error);
  });

const requestListener = async (req, res) => {
  const headers = {
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  if (req.url == "/todos" && req.method == "GET") {
    // getTodo.js
    getTodo(req, res);
  } else if (req.url == "/todos" && req.method == "POST") {
    // postTodo.js
    postTodo(req, res);
  } else if (req.url == "/todos" && req.method == "DELETE") {
    // deleteTodo.js
    deleteTodo(res, todos);
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    // deleteTodo.js
    deleteTodo(res, todos, req);
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    // patchTodo.js
    patchTodo(req, res);
  } else if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
