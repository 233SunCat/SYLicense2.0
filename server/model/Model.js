const Mongoose = require("mongoose");
const Model = Mongoose.Schema({
    wxid: String,
    modelName: {//设备名称
        type: String,
        default: ""
    },
    modelId: {//设备编号
        type: String,
        default: ""
    },
    inventoryStatus:{//是否在库
        type: String,
        default: ""
    },
    modelStyle: {//设备型号
        type: String,
        default: ""
    },
    produceDate: {//生产日期
        type: Date,
        default: null
    },
    produceLocation: {//生产地
        type: String,
        default: 0
    },
    softwareVersion: {//软件版本
        type: String,
        default: ""
    },
    processorSerialNumber: {//处理器序列
        type: String,
        default: 0
    },
    hardDriveSerialNumber: {//硬盘序列号
        type: String,
        default: ''
    },
    modelModule: {//模块信息
        type: [String],
        default: ['']
    },
    notes: {//备注
        type: String,
        default: ''
    },
});


const Fault = Mongoose.model('model', Model, 'model');

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;