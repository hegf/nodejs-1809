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


// 创建schema对象
let Schema = mongoose.Schema;
let userSchema = new Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String,required:true},
    ege:{type:Number,required:true},
    adress:{type:String,required:true}

})

let myuser = mongoose.model('myusers',userSchema);

module.exports = myuser;