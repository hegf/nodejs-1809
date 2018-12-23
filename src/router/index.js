//把路由封装成模块
const express = require('express');

// 引入单独路由模块
const userRouter = require('./user.js');
const goodsRouter = require('./goods.js');
const orderRouter = require('./order.js');
const goodsxiugaiRouter = require('./goodsxiugai.js');
const upgoodsRouter = require('./upgoods.js');
const onedelRouter = require('./onedel.js');
const addgoodsRouter = require('./addgoods.js');
const numdelRouter = require('./numdel.js');
const searchRouter = require('./search.js');
const loginRouter = require('./login.js');
const uploadRouter = require('./upload.js');
const sortRouter = require('./goodssort.js');
const orderdelRouter = require('./orderdel.js');

let Router = express.Router();

// 关于用户的路由
Router.use('/login',loginRouter);
Router.use('/userlist',userRouter);//用户列表

// 关于商品的路由
Router.use('/goodslist',goodsRouter);//商品列表
Router.use('/goodsxiugai',goodsxiugaiRouter);//商品修改
Router.use('/upgoods',upgoodsRouter);//修改后的商品
Router.use('/onedel',onedelRouter);//单个删除
Router.use('/addgoods',addgoodsRouter);//添加商品
Router.use('/numdel',numdelRouter);//批量删除
Router.use('/search',searchRouter);//模糊查询
Router.use('/sort',sortRouter);//模糊查询

// 关于订单的路由
Router.use('/orderlist',orderRouter);//订单列表
Router.use('/orderdel',orderdelRouter);//订单删除

Router.use('/addpics',uploadRouter);//图片上传

module.exports = Router;