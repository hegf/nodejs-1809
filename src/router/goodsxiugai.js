const express = require('express');
let Router = express.Router();
let myGoods = require('../mongodb/db_goods.js');

// 商品修改
Router.post('/',(req,res)=>{
    console.log(req.body._id)
    myGoods.find({_id:req.body._id})
    .then((data)=>{
        console.log(data);
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