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

});

Router.route('/onedel')
    .get(async (req,res)=>{
        // let _id = req.query.idx;
        // console.log(_id)
        myGoods.remove({_id:req.query.idx})
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
        myGoods.deleteMany({_id:req.query.id})
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