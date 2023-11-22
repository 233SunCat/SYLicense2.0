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
    default: Date.now
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
    default: ['']
  },
  equipmentNetwork:{//是否联网
    type: String,
    default: ""
  },
  protectTime:{//质保期
    type: String,
    default: ""
  },
  ReceivingName:{//收货人姓名
    type: String,
    default: ""
  },
  ReceivingPhone:{//收货人手机号
    type: String,
    default: ""
  },
  ReceivingCity:{//收货地址
    type: String,
    default: ""
  },
  equipmentReceivingCompany:{//收货机构
    type: String,
    default: ""
  },
  receivingCity_q:{//详细收货地址
    type: String,
    default: ""
  },
  receivingDate_q:{//期望到货时间
    type: Date,
    default: Date.now
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
    default: Date.now
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
    default: Date.now
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
    default: Date.now
  },
  dealer:{//代理商信息
    type: String,
    default: ""
  },
  contractSignDate:{//合同签订日期
    type: Date,
    default: Date.now
  },
  contractMoney:{//合同签订金额
    type: String,
    default: ""
  },
  paymentDate:{//付款日期
    type: Date,
    default: Date.now
  },
  paymentMethod:{//付款方式
    type: String,
    default: ""
  },
  winning_bid_price:{//中标价格
    type: String,
    default: ""
  },
  service_fee:{//服务费
    type: String,
    default: ""
  },
  invoice_status:{//开票情况
    type: String,
    default: ""
  },
  invoice_date:{//开票日期
    type: Date,
    default: Date.now
  },
  invoice_number:{//开票编号
    type: String,
    default: ""
  }
}
);
const Fault = Mongoose.model('shipequipment', ShipClient,'shipequipment');

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;