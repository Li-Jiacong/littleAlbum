const file = require("../models/file");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
var sd = require("silly-datetime");
//首页
/*
showIndex这是我不想用回调，试了很久用 async，await就是搞不出来
最后没办法用了回调
要注意：node里面所有的东西都是异步的，所以内层函数不是去拿到高层函数return回来的东西
而是要调用高层函数提供的回调函数。高层函数把数据通过回调函数的参数暴露出来。
就是要先拿到数据再render
 */

exports.showIndex = (req,res,next)=>{
    file.getAllAlbums( (err,arr) => {
        if(err){
            next();
            return;
        }
        res.render("index",{
            "albums" : arr
        }); 
    })
    // return;
};
//相册页
//这次在file.getImageByAlbumName使用了同步的方法，所以没有用到回调函数
exports.showAlbum = (req,res,next)=>{
    let albumName = req.params.albumName;
    file.getAllImagesByAlbumName(albumName,(err,imgArr)=>{
        if(err){
            next();
            return;
        }
        res.render("album",{
            albumName,
            imgArr
        })
    })
    // return;
}
//显示上传
exports.showUp = (req,res,next)=>{
    file.getAllAlbums( (err,arr) => {
        if(err){
            next();
            return;
        }
        res.render("up",{
            "albums": arr
        })
    })
    
}
//上传表单
exports.doPost = (req,res)=>{
    //用formidable实现图片的上传
    var form = new formidable.IncomingForm();
    //文件没有办法直接上传到选定的文件夹里。因为这个使用表单还没有提交，所以需要一个中转文件夹
    //这个中转文件夹就是tempUp,然后后续在提交表单后再把文件转移到指定文件夹，可以使用fs.rename
    form.uploadDir = path.normalize(__dirname + "/../tempUp");
    form.parse(req, function(err, fields, files,next) {
        if(err){
            next();
            return;
        }
        //获取图片大小并判断（我觉得es7的幂用两个**真方便）
        let size = parseInt(files.image.size);
        if(size >= 2**23){
            res.send("上传的图片不能超过8MB");
            //删除图片
            fs.unlink(files.image.path,(err)=>{
                if(err){
                    res.send('path/file.txt was deleted');
                }
            })
            return;
        }

        // console.log(fields);
        // console.log(files);
        //为文件从tempUp转移到指定文件夹做准备
        let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');//为每个文件生成一个跟日期对勾的名字
        let ran = parseInt(Math.random() * 89999 + 10000);//防止短时间内多次提交，在日期后加上随机数
        let extname = path.extname(files.image.name);
        let oldPath = files.image.path;
        let newPath = path.normalize(__dirname+"/../uploads/"+fields.folder+"/"+ttt+ran+extname)
        // console.log(oldPath)
        fs.rename(oldPath,newPath,err=>{
            if(err){
                res.send("fail to rename");
            }
        })
        // res.send("成功");
        res.render("succeed",{
            albumName: fields.folder,
        })
    });
 
    return;
}