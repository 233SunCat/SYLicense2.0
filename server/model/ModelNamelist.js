const Mongoose = require("mongoose");
const ModelNamelist = Mongoose.Schema({
    wxid: String,
    modelName: {//设备名称
        type: String,
        default: ""
    },
    modelStyle:{//设备型号
        type: String,
        default: ""
    },
    modelModule:{//设备模块
        type: [String],
        default: ['']
    }
}
);
  
  
const Fault = Mongoose.model('modelnamelist', ModelNamelist,'modelnamelist');

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;