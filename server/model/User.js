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

  nickName: {
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
  }
});
const User = Mongoose.model("User", UserSchema);
module.exports = {
  User: User
};