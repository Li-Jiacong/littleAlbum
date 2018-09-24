const fs = require("fs");

//这个函数的callback中含有两个参数，一个是err
//另一个是存放所有文件夹名字的array。

exports.getAllAlbums = (callback)=>{
    fs.readdir("./uploads",(err,files)=>{
        // console.log(files);
        if(err){
            callback(err,null);
            return;
        }
        var allAlbums = [];
        (function iterator(i){
            if(i == files.length){
                //遍历结束
                // console.log(allAlbums);
                callback(null,allAlbums);
                return;
            }
            fs.stat("./uploads/" + files[i],(err,stats)=>{
                if(err){
                    callback(err , null);
                    return;
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
}

exports.getAllImagesByAlbumName = (albumName,callback)=>{
    fs.readdir("./uploads/"+albumName,(err,files)=>{
        if(err){
            callback(err,null);
            return;
        }
        var imgArr = [];
        (function iterator(i) { 
            if(i == files.length){
                callback(null,imgArr);
                return;
            }
            fs.stat("./uploads/"+albumName+"/"+files[i],(err,stats)=>{
                if(err){
                    callback(err,null);
                    return;
                }
                if(stats.isFile()){
                    imgArr.push(files[i])
                }
                iterator(i+1);
            })
        })(0);

    })
}
