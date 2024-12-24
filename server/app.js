const express = require("express");

// 创建Express应用
const app = express();

// 设置路由
app.get("/test", (req, res) => {
  res.send({ code: 800, data: [1, 2, 3, 4] });
});

// 监听端口
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
