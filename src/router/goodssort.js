const express = require('express');
let Router = express.Router();
let myGoods = require('../mongodb/db_goods.js');

//降序
Router.route('/down')
    .get(async (req,res)=>{
        myGoods.find().sort({"price":1})
        .then((data)=>{
            res.send({
                status:1,
                data,
                msg:"降序排列"
            })
        })
        .catch((err)=>{
            res.send({
                status:-1,
                data:err,
                msg:"排序失败"
            })
        })
    });

// 升序
Router.route('/up')
    .get(async (req,res)=>{
        myGoods.find().sort({"price":-1})
        .then((data)=>{
            res.send({
                status:1,
                data,
                msg:"升序排列"
            })
        })
        .catch((err)=>{
            res.send({
                status:-1,
                data:err,
                msg:"排序失败"
            })
        })
    });
   
    
  
module.exports = Router;