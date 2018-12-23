const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mygoods',{ useNewUrlParser: true });

let db = mongoose.connection;

// 实例化连接对象
db.on("erre",function(erre){
    console.log("数据库连接失败原因："+err)
});
db.on("open",function(){
    console.log("数据库连接成功")
});
db.on("disconnected",function(){
    console.log("数据库断开连接")
})

// 创建Schema对象
let Schema = mongoose.Schema;
 let goodsSchema=new Schema({
 	name:{type:String,required:true},
 	type:{type:String,required:true},
 	desc:{type:String,required:true},
   price:{type:Number,required:true},
   kucun:{type:Number,required:true},
   times:{type:String,required:true},
     
 })
 
let myGoods=mongoose.model('mygoods',goodsSchema);
module.exports=myGoods;