const Mongoose = require("mongoose");
const ModelApply = Mongoose.Schema({
    wxid: String,

    applyNameApply: {//样机申请方
        type: String,
        default: ""
    },
    usedNameApply:{//样机使用用户
        type: String,
        default: ""
    },
    usedFunctionApply:{//样机使用用途
        type: String,
        default: ''
    },
    modelNameApply:{//选择设备名称
        type: String,
        default: ''
    },
    modelModuleApply:{//设备模块
        type: [String],
        default: ['']
    },
    arrivalDateApply:{//期望样机到货时间
        type: Date,
        default: null
    },
    arrivalLocationApply:{//期望样机到货地点
        type: String,
        default: ''
    },
    applyDateApply:{//申请发起时间
        type: String,
        default: null
    },
    applyStatusApply:{//申请状态
        type: String,
        default: ''
    },
    modelIdAllocation: {//设备编号
        type: String,
        default: ""
    },
    modelStyleAllocation: {//设备型号
        type: String,
        default: ""
    },
    modelModuleAllocation: {//申请模块信息
        type: [String],
        default: ['']
    },
}
);
  
  
const Fault = Mongoose.model('modeapply', ModelApply,'modeapply');

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;