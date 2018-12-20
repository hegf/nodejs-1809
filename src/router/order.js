const express = require('express');
let Router = express.Router();

// 数据模型引入
let myGoods = require('../mongodb/db_goods.js');

// 商品列表
Router.post('/',(req,res)=>{
    
// 分页条数、总条数
 let  {current,page}=req.body
  let obj={}
  myGoods.find()
  .then((data)=>{
  	// 获取总条数
  	obj.total=data.length
  	  return myGoods.find().limit(Number(current)).skip((Number(page)-1)*Number(current))
  })
  .then((data)=>{
  	//处理的是第几页的几条数据
      obj.goodslist=data;
      obj.length=data.length;
  	res.send({err:0,msg:'查询成功',data:obj})
  })
  .catch((err)=>{
  	console.log(err)
  	res.send({err:-1,msg:'查询错误',data:null})
  })

})


module.exports = Router;