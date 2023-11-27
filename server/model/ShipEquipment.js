const Mongoose = require("mongoose");

//微粒-每单设备
const ShipClient = Mongoose.Schema({
  wxid: String,

  clientName: {//客户名称 
    type: String,
    default: ""
  },
  orderStatus: {//中标状态
    type: String,
    default: ""
  },
  orderDate: {//订单时间
    type: Date,
    default: null
  },
  equipmentName: {//订单设备名称
    type: String,
    default: ""
  },
  equipmentId: {//订单设备编号
    type: String,
    default: ""
  },
  equipmentStyle:{//订单设备型号
    type: String,
    default: ""
  },
  equipmentModule:{//订单设备模块
    type: [String],
    default: null
  },
  equipmentNetwork:{//是否联网
    type: String,
    default: ""
  },
  protectTime:{//质保期
    type: String,
    default: ""
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
    type: String,
    default: ""
  },  
  acceptName:{//验收方姓名
    type: String,
    default: ""
  },
  acceptPhone:{//验收方手机号
    type: String,
    default: ""
  },
  acceptDate:{//验收日期
    type: Date,
    default: null
  },
  dealer:{//代理商信息
    type: String,
    default: ""
  },
  contractSignDate:{//合同签订日期
    type: Date,
    default: null
  },
  contractMoney:{//合同签订金额
    type: String,
    default: ""
  },
  paymentDate:{//付款日期
    type: Date,
    default: null
  },
  paymentMethod:{//付款方式
    type: String,
    default: ""
  },
  winningBidPrice:{//中标价格
    type: String,
    default: ""
  },
  serviceFee:{//服务费
    type: String,
    default: ""
  },
  invoiceStatus:{//开票情况
    type: String,
    default: ""
  },
  invoiceDate:{//开票日期
    type: Date,
    default: null
  },
  invoiceNumber:{//开票编号
    type: String,
    default: ""
  }
}
);
const Fault = Mongoose.model('shipequipment', ShipClient,'shipequipment');

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;