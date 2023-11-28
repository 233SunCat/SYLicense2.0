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
    },
    signforDate: {//签收时间
        type: Date,
    },
    faultDate: {
        type: Date,
    },
    faultPhenomenon: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    operation: {
        type: String,
        default: ''
    },
    notes:{
        type: String,
        default: ''
    },
}
);
  
  
const Fault = Mongoose.model('Equipment', EquipmentSchema);  

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;