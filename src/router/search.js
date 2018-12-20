const express = require('express');
let Router = express.Router();
let myGoods = require('../mongodb/db_goods.js');

// 模糊添加
Router.post('/',(req,res)=>{
    let {con} = req.body;
    if(con == ''){
        return;
    }
    myGoods.find({$or:[{name:{$regex:con}},{type:{$regex:con}},{desc:{$regex:con}},{price:{$regex:con}},{kucun:{$regex:con}}]})
    .then((data)=>{
        res.send({
            status:1,
            data,
            msg:"查询成功"
        })
    })
    .catch((err)=>{
        res.send({
            status:-1,
            data:err,
            msg:"查询失败"
        })
    })
});
module.exports = Router;