
const Mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const Fault = require("../model/Equipment");

/*
Mongoose.connect("mongodb://150.158.140.41/SYLicense")
    .then(() => { console.log("连接数据库成功") })
    .catch(() => { console.log("连接数据库失败") });
    */

//插入数据

// module.exports = InsertEquipment;