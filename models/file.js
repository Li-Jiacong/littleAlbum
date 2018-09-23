const fs = require("fs");

exports.getAllAlbums = function(callback){
    fs.readdir("./uploads", (err,files)=>{
        // console.log(files); 返回一个数组
        const allAlbums = files.filter( async item => {  //这个async原理我也说不太清，捣鼓出来的
              fs.stat("./uploads/"+item,(err,stats)=>{
                stats.isDirectory()
            })
        })
        callback(allAlbums);
        // Promise.resolve(allAlbums);
    })
    
}