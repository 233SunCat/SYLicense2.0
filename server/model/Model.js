const Mongoose = require("mongoose");
const Model = Mongoose.Schema({
    wxid: String,
    equipmentName: {//设备名称
        type: String,
        default: ""
    },

    equipmentId: {//设备编号
        type: String,
        default: ""
    },

    equipmentStyle: {//设备型号
        type: String,
        default: ""
    },

    produceDate: {//生产日期
        type: String,
        default: ""
    },
    produceLocation: {//生产地
        type: String,
        default: 0
    },
    softwareVersion: {//软件版本
        type: String,
        default: ""
    },
    faultPhenomenon: {//处理器序列
        type: String,
        default: 0
    },
    imageVideo:{//硬盘序列号
        type: String,
        default: ''
    },

    operation: {//模块信息
        type: [String],
        default: ['']
    },
    notes:{//备注
        type: String,
        default: ''
    },
}
);
  
  
const Fault = Mongoose.model('Model', Model);  

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;