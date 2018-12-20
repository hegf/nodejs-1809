const express = require('express');
let Router = express.Router();
let myGoods = require('../mongodb/db_goods.js');

// 商品删除
Router.post('/',(req,res)=>{
    // console.log(req.body._id)
    myGoods.remove({_id:req.body._id})
    .then((data)=>{
        res.send({
            status:1,
            data,
            msg:"删除成功"
        })
    })
    .catch((err)=>{
        res.send({
            status:-1,
            data:err,
            msg:"删除失败"
        })
    })
});
    



module.exports = Router;