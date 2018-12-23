const express = require('express');
let Router = express.Router();

// 数据模型引入
let myGoods = require('../mongodb/db_goods.js');

Router.route('/onedel')
    .get(async (req,res)=>{
        console.log(req.query._id)
        myGoods.remove({_id:req.query._id})
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
Router.route('/numdel')
    .get(async (req,res)=>{
        myGoods.deleteMany({_id:req.body._id})
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