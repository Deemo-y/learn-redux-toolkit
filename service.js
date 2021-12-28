const http = require("http");

const port = 8080;

const hostname = "127.0.0.1";

const todos = [
  {
    id: Math.random(),
    text: "CCCCCCC",
    isFinished: false,
    createdAt: new Date().getTime(),
  },
  {
    id: Math.random(),
    text: "DDDDDDD",
    isFinished: false,
    createdAt: new Date().getTime(),
  },
];

const server = http.createServer((req, res) => {
  // let data = "";
  req.on("data", (chunk) => {
    // data += chunk;
  });

  req.on("end", () => {
    switch (req.url) {
      case "/getTodos": {
        res.statusCode = 200;
        // 允许跨域
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(todos));
        break;
      }
      default: {
        res.statusCode = 404;
        res.end();
      }
    }
  });
});

server.listen(port, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});
