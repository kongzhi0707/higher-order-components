
/**
 * 职责:
 * 1. 创建服务
 * 2. 模板引擎
 * 3. body-parser 解析表单post请求体
 * 4. 提供静态资源服务
 * 5. 挂载路由
 * 6. 监听端口启动服务
*/

const express = require('express');
const Router = express.Router();

// 引入api路由
const apiList = require('./src/apiforward/apiList/index');
const app = express();
const port = process.env.PORT || 3002;

// 设置静态资源
app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));


app.use((req, res, next) => {
  // 解决跨域
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

// 挂载路由
app.use(apiList(Router));

app.listen(port, () => {
  console.log(`app listening on http://127.0.0.1:${port}`);
});