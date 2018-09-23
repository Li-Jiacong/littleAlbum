const file = require("../models/file");
//首页
/*
showIndex这是我不想用回调，试了很久用 async，await就是搞不出来
最后没办法用了回调
要注意：node里面所有的东西都是异步的，所以内层函数不是去拿到高层函数return回来的东西
而是要调用高层函数提供的回调函数。高层函数把数据通过回调函数的参数暴露出来。
就是要先拿到数据再render
 */
exports.showIndex = (req,res)=>{
    file.getAllAlbums( arr => {
        res.render("index",{
            "albums" : arr
        }); 
    })
};
//相册页
exports.showAlbum = (req,res)=>{
    res.send(req.params.albumName);
}