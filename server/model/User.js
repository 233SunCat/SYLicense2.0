const Mongoose = require("mongoose");


const UserSchema = Mongoose.Schema({
  wxid: String,

  userName: {
    type: String,
    default: ""
  },

  password: {
    type: String,
    default: ""
  },

  nickName: {//昵称
    type: String,
    default: ""
  },

  realName: {
    type: String,
    default: ""
  },

  permission: {
    type: Number,
    default: 0
  },
  wxID:{

  },
  applyDate:{//申请时间
    type: Date,
    default: null
  },
  applyStatus:{
    type: String,
    default: ""
  }
}
);
const User = Mongoose.model("User", UserSchema);
module.exports = {
  User: User
};