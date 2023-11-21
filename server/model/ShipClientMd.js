const Mongoose = require("mongoose");

//微粒-订单
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
  }
}
);
const Fault = Mongoose.model('shipclient', ShipClient,'shipclient');

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;