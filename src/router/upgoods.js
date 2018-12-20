const express = require('express');
let Router = express.Router();
let myGoods = require('../mongodb/db_goods.js');

// 商品修改
Router.post('/',(req,res)=>{
    let id = req.body._id;console.log(id);
    let {name,type,desc,price,kucun,times} = req.body;
    myGoods.update({_id:id},{name,type,desc,price,kucun,times})
    .then((data)=>{
        // console.log(data);
        res.send({
            status:1,
            data:[],
            msg:"修改成功"
        })
    })
    .catch((err)=>{
        res.send({
            status:-1,
            data:err,
            msg:"修改失败"
        })
    })
});
    

module.exports = Router;