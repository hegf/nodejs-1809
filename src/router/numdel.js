const express = require('express');
let Router = express.Router();
let myGoods = require('../mongodb/db_goods.js');

// 商品批量删除
Router.post('/',(req,res)=>{
    console.log(req.body.id);
    if(req.body.id==''){ 
        res.send({
            status:-1,
            data:err,
            msg:"删除失败"
        });
        return
    }
    myGoods.remove({_id:req.body.id})
    .then((data)=>{
        res.send({
            status:1,
            data:data,
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