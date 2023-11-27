const Mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const UserSchema = Mongoose.Schema({
  wxid: String,

  nickName: {//昵称
    type: String,
    default: ""
  },

  realName: {
    type: String,
    default: ""
  },

  permission: {
    type: String,
    default: ""
  },
  wxID:{
    type: String,
    default: ""
  },
  applyDate:{//申请时间
    type: Date,
    default: null
  },
  applyStatus:{
    type: String,
    default: ""
  },
  operation:{
    type: Number,
    default: 0
  }
}
);
const User = Mongoose.model("users", UserSchema,'users');
module.exports = User