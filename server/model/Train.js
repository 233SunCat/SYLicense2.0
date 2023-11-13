const Mongoose = require("mongoose");

//训练模块模版
const TrainModuleTemplateSchema = Mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '请传入用户id']
    },
  
    moduleType: String,
  
    trainItemMap: {
      type: Map,
      of: String
    },
  
    comment: String
  });
  
  const TrainModuleTemplate = Mongoose.model("TrainModuleTemplate", TrainModuleTemplateSchema);
//训练模块相关
const trainCaseSchema = Mongoose.Schema({
    caseEnName: {
      type: String,
      default: ""
    },
  
    caseChsName: {
      type: String,
      default: ""
    },
  
    skillLevel: {
      type: String,
      default: ""
    },
  
    trainCode: {
      type: String,
      default: "0"
    },
  
    /// BASICGI UPGI DOWNGI etc.
    caseType: {
      type: String,
      default: "",
    },
  
    aviFile: {
      type: String,
      default: ""
    },
  
    caseFile: {
      type: String,
      default: ""
    }
  });
  
  const trainItemSchema = Mongoose.Schema({
    trainEnName: {
      type: String,
      default: ""
    },
    trainChsName: {
      type: String,
      default: ""
    },
  
    hasSubCase: {
      type: Boolean,
      default: false
    },
  
    trainCases: [trainCaseSchema]
  });
  
  const trainSubModuleSchema = Mongoose.Schema({
    subModuleChsName: String,
    subModuleEnName: String,
    iconName: String,
    trainItems: [trainItemSchema]
  });
  
  const trainModuleSchema = Mongoose.Schema({
    moduleChsName: {
      type: String,
      default: ""
    },
  
    moduleEnName: {
      type: String,
      default: ""
    },
  
    /// lap、dig、puncture etc.
    moduleType: String,
    moduleTypeCode: String,
  
    iconName: String,
  
    description: String,
  
    subModules: [trainSubModuleSchema],
  
    trainItems: [trainItemSchema]
  });
  
  const TrainModuleInfos = Mongoose.model("TrainModule", trainModuleSchema);
  module.exports = {
    TrainModuleTemplate: TrainModuleTemplate,
    TrainModuleInfo: TrainModuleInfos
  };