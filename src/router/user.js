const express = require('express');
let Router = express.Router();

// 数据模型引入
let myUser = require('../mongodb/db_user.js');

// 创建数据
// for(let i=0;i<10;i++){
// let data = {name:'hegf',password:'hgf123',gender:'男',ege:25,adress:'广州'};
// myUser.insertMany(data,(err,res)=>{
//     if(err){console.log(err)}
//     console.log(res)
// })
// }

// 用户列表
Router.post('/', (req, res) => {
    console.log(req.body);
    // myUser.find().then((data)=>{
    //     console.log(data)
    // })

    let {
        current,
        page
    } = req.body
    let obj = {}
    myUser.find()
        .then((data) => {
            // 获取总条数
            obj.total = data.length
            return myUser.find().limit(Number(current)).skip((Number(page) - 1) * Number(current))
        })
        .then((data) => {
            //处理的是第几页的几条数据
            obj.userlist = data;
            obj.length = data.length;
            res.send({
                err: 0,
                msg: '查询成功',
                data: obj
            })
        })
        .catch((err) => {
            console.log(err)
            res.send({
                err: -1,
                msg: '查询错误',
                data: null
            })
        })

})


module.exports = Router;