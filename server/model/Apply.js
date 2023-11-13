const Mongoose = require("mongoose");

//apply license schema
const ApplyLicenseSchema = Mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传入用户id']
    },

    comment: {
        type: String,
        default: ""
    },

    cpuId: {
        type: String,
        default: ""
    },

    diskId: {
        type: String,
        default: ""
    },

    applyTime: {
        type: Date,
        default: Date.now
    },

    approverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    approvedTime: {
        type: Date
    },

    status: {
        type: Number,
        default: 0
    }
});
const ApplyLicense = Mongoose.model("ApplyLicense", ApplyLicenseSchema);
//申请下载训练模块
const ApplyModuleSchema = Mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传入用户id']
    },

    licenseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApplyLicense',
        required: [true, '请传入授权id']
    },

    comment: String,

    moduleType: String,

    trainItemMap: {
        type: Map,
        of: String
    },

    applyTime: {
        type: Date,
        default: Date.now
    },

    approverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    approvedTime: {
        type: Date
    },

    status: {
        type: Number,
        default: 0
    }
});

const ApplyModule = Mongoose.model("ApplyModule", ApplyModuleSchema);

module.exports = {
    ApplyLicense: ApplyLicense,
    ApplyModule: ApplyModule
};