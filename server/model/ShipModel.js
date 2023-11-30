const Mongoose = require("mongoose");
const ShipModel = Mongoose.Schema({
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
    ship: [{
        ApplyNameApply: {//样机申请方
            type: String,
            default: ""
        },
        UsedNameApply: {//样机使用用户
            type: String,
            default: ""
        },
        UsedFunctionApply: {//样机使用用途
            type: String,
            default: ''
        },
        modelNameApply: {//选择设备名称
            type: String,
            default: ''
        },
        modelModuleApply: {//设备模块
            type: [String],
            default: ['']
        },
        modelArrivelTime: {//期望样机到货时间
            type: Date,
            default: Date.now
        },
        modelArriveLocation: {//期望样机到货地点
            type: String,
            default: ''
        },
        receivingName:{//收货人姓名
            type: String,
            default: ""
          },
          receivingPhone:{//收货人手机号
            type: String,
            default: ""
          },
          receivingCity:{//收货地址
            type: String,
            default: ""
          },
          receivingCompany:{//收货机构
            type: String,
            default: ""
          },
          receivingCity_q:{//详细收货地址
            type: String,
            default: ""
          },
          receivingDate:{//期望到货时间
            type: Date,
            default: null
          },
          emailName:{//发货人姓名
            type: String,
            default: ""
          },
          emailPhone:{//发货人手机号
            type: String,
            default: ""
          },
          emailCity:{//发货城市
            type: String,
            default: ""
          },
          emailCompany:{//发货机构
            type: String,
            default: ""
          },
          emailCity_q:{//详细发货地址
            type: String,
            default: ""
          },
          emailDate:{//发货时间
            type: Date,
            default: null
          },
          shippingCost:{//物流费用
            type: String,
            default: ""
          },
          paymentMethod:{//支付方式
            type: String,
            default: ""
          },
          signforName:{//签收人姓名
            type: String,
            default: ""
          },
          signforPhone:{//签收人手机号
            type: String,
            default: ""
          },
          signforDate:{//签收日期
            type: Date,
            default: null
          },
          inventoryStatus:{//是否在库
            type: [String],
            default: ['']
          },  
          shipTime:{//是否在库
            type: [String],
            default: ['']
          }
    }]
});


const Fault = Mongoose.model('shipmodel', ShipModel, 'shipmodel');

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;