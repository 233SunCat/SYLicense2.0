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
    imageVideo:{
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
    }
});
  
  
const Fault = Mongoose.model('Equipment', EquipmentSchema);  

// console.log(Fault)
// module.exports = Fault;
module.exports = Fault;