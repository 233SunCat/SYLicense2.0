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
        type: Date,
        default: null
    },
    applyStatusApply:{//申请状态
        type: String,
        default: ''
    },
    modelIdAllocation: {//设备编号-分配
        type: String,
        default: ""
    },
    modelNameAllocation: {//设备名称-分配
      type: String,
      default: ""
  },
    modelInventoryStatusAllocation: {//设备在库状态-分配
      type: String,
      default: ""
  },
    modelModuleAllocation: {//模块信息-分配
        type: [String],
        default: ['']
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
      inventoryStatus:{//是否在库，签收后
        type: String,
        default: ""
      }
}
);
  
  
const Fault = Mongoose.model('modeapply', ModelApply,'modeapply');

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;