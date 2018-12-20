const express = require('express');
let Router = express.Router();
let myGoods = require('../mongodb/db_goods.js');

// 商品添加
Router.post('/',(req,res)=>{
    // console.log(req.body)
    let {name,type,desc,price,kucun,times} = req.body;
    myGoods.insertMany({name,type,desc,price,kucun,times})
    .then((data)=>{
        res.send({
            status:1,
            data,
            msg:"添加成功"
        })
    })
    .catch((err)=>{
        res.send({
            status:-1,
            data:err,
            msg:"添加失败"
        })
    })
});
module.exports = Router;