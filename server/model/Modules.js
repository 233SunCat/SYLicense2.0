const Mongoose = require("mongoose");

//微粒-每单设备
const modules = Mongoose.Schema({
  wxid: String,
  equipmentName:{//设备名称
    type: String,
    default: ''
  },
  moduleFile: {//合同文件
    type: String,
    default: ''
  },
}
);
const Fault = Mongoose.model('modulefile', modules, 'modulefile');
// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;