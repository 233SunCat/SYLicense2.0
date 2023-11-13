const mongoose = require('mongoose');

//测试链接缉
function MongodbInit(){
  mongoose.connect("mongodb://127.0.0.1:27017/SYLicense")
//mongoose.connect("mongodb://sooyan:sy.3721@127.0.0.1/SYLicense")
    .then(() => { console.log("连接数据库成功") })
    .catch(() => { console.log("连接数据库失败") });
}

module.exports = MongodbInit