const Mongoose = require("mongoose");

//微粒-每单设备
const ShipEvent = Mongoose.Schema({
  wxid: String,

  eventDescription: {// 
    type: String,
    default: ""
  },
  eventDate: {// 
    type: Date,
    default: null
  },
  eventUsedMoney: {// 
    type: String,
    default: ""
  },
  clientName: {//客户名称
    type: String,
    default: ""
  },
  orderDate: {//订单日期 
    type: Date,
    default: null
  },
}
);
const Fault = Mongoose.model('shipevent', ShipEvent,'shipevent');

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;