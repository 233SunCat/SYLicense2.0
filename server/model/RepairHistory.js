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
    repairStatus:{
        type: String,
        default: ''
    },
    faultDate: {
        type: Date,
    },
    faultPhenomenon: {
        type: String,
        default: ''
    },
    imageVideo:{//故障图片
        type: String,
        default: ''
    },

    repairEngineer:{//维修人
        type: String,
        default: ''
    },
    repairDate:{//维修时间
        type: Date,
    },
    repairLocation:{//维修地址
        type: String,
        default: ''
    },
    repairWay:{//维修方式
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
    },
});
