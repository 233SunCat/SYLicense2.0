
// app.post('/users', (req, res) => {  
//     const { name, email, password } = req.body;  

//     const newUser = new User({ name, email, password });  

//     newUser.save()  
//       .then(() => {  
//         res.send('User created successfully');  
//       })  
//       .catch((err) => {  
//         res.status(400).send('Error creating user: ' + err);  
//       });  
//   });
//add default admin user

const Mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const MongodbInit = require("./MongodbInit")
/*
Mongoose.connect("mongodb://150.158.140.41/SYLicense")
    .then(() => { console.log("连接数据库成功") })
    .catch(() => { console.log("连接数据库失败") });
    */
    MongodbInit();
// User Schema



//add default admin user
//默认user
var createDefaultUser = async () => {
  try {
    const record = await User.findOne({ userName: "admin" });
    if (record == null) {
      console.log("create admin user: admin");
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash("sy.3721", salt);
      User.create({
        userName: "admin",
        password: password,
        nickName: "超级管理员",
        realName: "超级管理员",
        permission: -1
      });
    }
  } catch (e) {
    console.log('create default user fail.');
    console.log(e);
  }
};


User.find()
  .then((users) => {
    console.log('查询结果:', users);
  })
  .catch((err) => {
    console.log('查询失败:', err);
  });
//createDefaultUser();x

//单条修改user
