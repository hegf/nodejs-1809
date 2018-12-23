const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

let app = express();

// 跨域解决
app.use(cors());

// post请求数据格式化
app.use(bodyParser.urlencoded({extended:false}));

// 静态资源目录
app.use(express.static(path.join(__dirname,'./src/admin')));

// 路由
const Router = require('./src/router/index.js');
app.use(Router);

// 图片上传测试
// const Router = require('./src/router/upload.js');
// app.use(Router);

app.listen(2222,()=>{
    console.log('server start is point'+2222)
})