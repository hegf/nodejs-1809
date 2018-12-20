const express = require('express');
const multer = require('multer');
const path = require('path');
const fs=  require('fs')
const Router = express.Router();




let upload = multer({dest:'../upload/'});
Router.post('/',upload.single('test'),(req,res)=>{
    console.log(req.file);
    fs.readFile(req.file.path,(err,data)=>{
    	if (err) { return res.send('上传失败')}
    	//为了保障图片不被覆盖 采用 时间戳+随机方式生成文件名
        let name=new Date().getTime()+parseInt(Math.random(0,1)*10000)+path.extname(req.file.originalname);
    	fs.writeFile(path.join(__dirname,'../../public/'+name), data, (err)=>{
    		//保存数据库的应该是  相对的图片路径
    		if (err) {console.log(err)}
    		res.send({err:0,msg:'上传ok',data:'/img/'+name})
    	});

    });
   
});
 module.exports = Router;