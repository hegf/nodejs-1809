const express = require('express');
let Router = express.Router();
let myUser = require('../mongodb/db_user.js');

// login
Router.post('/',(req,res)=>{
    // console.log(req.body)
    let {name,password} = req.body;
    if(name =='' || password ==''){
        res.send({
            status:-1,
            msg:"请输入用户名密码"
        })
    }
    myUser.findOne({name,password})
    .then((data)=>{
        if(data == null){
            res.send({
                status:-1,
                msg:"请输入用户名密码"
            })
        }
        res.send({
            status:1,
            data,
            msg:"有该用户"
        })
    })
    .catch((err)=>{
        res.send({
            status:-1,
            data:err,
            msg:"无此用户"
        })
    })
});
module.exports = Router;