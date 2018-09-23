const express = require("express");
const app = express();
const router = require("./controller");

//设置模板引擎
app.set("view engine","ejs");

//middleware
//静态页面
//app.use("/static",express.static("./public")); //为了避免下面的路由被静态页面给占了，加上一个私有前缀 /static
/*但是呢，如果加了私有前缀，这样前端那边写的页面是放在views文件夹下的，而其他文件放在静态文件夹
public上，这样所有类似 src="" 的引用路径全部不对了，就很麻烦，所以还是不要加前缀比较好，不然要去
给所有的路径重新定位到./public里面去，但是在公司里面开发的话一般有一个专门放图片的静态服务器，通过
绝对路径去引用资源，就不会有这种尴尬的情况发生*/
app.use(express.static('./public'));

//首页
app.get('/',router.showIndex);
app.get('/:albumName',router.showAlbum);

app.listen(3000);