const Mongoose = require("mongoose");
const ModelNamelist = Mongoose.Schema({
    wxid: String,
    modelApplyName: {//样机申请方
        type: String,
        default: ""
    },
    modelUsedName:{//样机使用用户
        type: String,
        default: ""
    },
    modelUsedFunction:{//样机使用用途
        type: [String],
        default: ['']
    },
    modelArrivelDate:{//期望样机到货时间
        type: Date,
        default: Date.now
    },
    modelArriveLocation:{//期望样机到货地点
        type: String,
        default: ''
    }
}
);
  
  
const Fault = Mongoose.model('modelnamelist', ModelNamelist,'modelnamelist');

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;