const Mongoose = require("mongoose");
const EquipmentSchema = Mongoose.Schema({
    wxid: String,
    equipmentName: {
        type: String,
        default: ""
    },

    equipmentId: {
        type: String,
        default: ""
    },

    clientName: {
        type: String,
        default: ""
    },

    qualityDate: {
        type: String,
        default: ""
    },

    faultDate: {
        type: Date,
        default: 0
    },
    faultPhenomenon: {
        type: String,
        default: 0
    },
    imageVideo:{//故障图片
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 0
    },
    operation: {
        type: String,
        default: 0
    },
    notes:{
        type: String,
        default: ''
    },
    repairEngineer:{//维修人
        type: String,
        default: ''
    },
    repairTime:{//维修时间
        type: Date,
        default: 0
    },
    repairLocation:{//维修地址
        type: String,
        default: ''
    },
    repairMoney:{//维修成本
        type: Number,
        default: 0
    },
    repairContext:{//维修内容
        type: String,
        default: ''
    },
    repairNotes:{//维修备注
        type: String,
        default: ''
    }
}
);
  
  
const Fault = Mongoose.model('Equipment', EquipmentSchema);  

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;