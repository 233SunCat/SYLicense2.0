
var express = require('express');
var router = express.Router();
var cors = require('cors');
const InsertEquipment = require('../controller/EquipmentController')
const Fault = require('../model/Equipment'); // 导入你定义的模型  
const dbController = require('../controller/DBController')
const orderEquipment = require('../model/ShipEquipment')
const path = require('path')
const md5 = require('md5');

const multer = require('multer'); // 用于处理 multipart/form-data 类型的数据  
const upload = multer({
  // 文件上传的位置
  // dest: path.join(__dirname, "../public/uploads"),
  fileFilter(req, file, callback) {
    // 解决中文名乱码的问题 latin1 是一种编码格式
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    callback(null, true);
  },
  storage: multer.diskStorage({
    //上传文件的目录
    destination: function(req, file, cb) {
      cb(null, './uploads')
    },//上传的相对路径
    //上传文件的名称
    filename: function (req, file, cb) {
      cb(null, decodeURI(file.originalname))
    }
  })
});

router.use(cors());

router.post('/EquipmentSubmit', upload.array('files', 5), async (req, res) => {
  try {
    const equipmentId = req.body.equipmentId;
    const clientName = req.body.clientName;
    const equipmentName = req.body.equipmentName;
    const faultDate = req.body.faultDate;
    const faultPhenomenon = req.body.faultPhenomenon;
    const notes = req.body.notes;
    const protectTime = req.body.protectTime;
    const signforDate = req.body.signforDate;
    const status = '待维修';

    // 处理上传的文件
    const files = req.files;
    const filePaths = files.map(file => file.path);
    const imageVideo = filePaths;
    // 使用updateOne方法，根据equipmentId进行更新或插入
    const result = await Fault.updateOne(
      { equipmentId: equipmentId },
      {
        $set: {
          clientName,
          equipmentName,
          faultDate,
          faultPhenomenon,
          notes,
          protectTime,
          signforDate,
          status,
          imageVideo,
        },
      },
      { upsert: true } // 设置upsert为true，表示如果找不到匹配的记录，就插入一条新的记录
    );
      if (result.modifiedCount > 0) {
        res.send({ success: true });
      } else {
        res.send({ success: false, message: 'Update failed or no matching document found.' });
      }
  } catch (error) {
    console.error(error);
    res.send({ success: false, error: error.message });
  }
});



router.post('/EquipmentSearch',async(req, res) => {
  //const data = await Fault.find()
  // 创建查询条件
  const query = {  
    //equipmentId: equipmentId,  
    faultDate: {  
      $gte: req.body.startDate,  
      $lte: req.body.endDate  
    }  
  };  
  if(req.body.selectedOption!=''){
    query.status = req.body.selectedOption
  }
  if(req.body.keyword!=''){
    const keywordRegex = new RegExp(req.body.keyword, 'i');  
    query.$or = [  
      { equipmentName: { $regex: keywordRegex } },  
      { equipmentId: { $regex: keywordRegex } } ,
      {clientName:{ $regex: keywordRegex }}
    ];  
  }

  try {  
    const equipmentDetail = await Fault.find(query).exec();  
    res.json(equipmentDetail); // 将结果以JSON格式返回给客户端 
  } catch (error) {  
    console.error('检索设备详情时出错：', error);  
    res.status(500).send('服务器错误');  
  }  
})
/**
 * 获得
 */
router.post('/EquipmentSearchImage',async(req, res) => {
  //const data = await Fault.find()
  // 创建查询条件
  console.log('1111111')
  const query = {  
    equipmentId: req.body.equipmentId,  
  };  
  try {  
    const equipmentDetail = await Fault.find(query).exec();  
    if(equipmentDetail != null){
      res.json(equipmentDetail[0].imageVideo); // 将结果以JSON格式返回给客户端 
    }
    console.log('equipmentDetail',equipmentDetail)
  } catch (error) {  
    console.error('检索设备详情时出错：', error);  
    res.status(500).send('服务器错误');  
  }  
})
router.post('/EquipmentDetail',async(req, res) => {
  try {  
    // 从 req.body 中获取 equipmentId  
    const { equipmentId } = req.body;  
    // 使用模型查询数据  
    const equipmentDetail = await Fault.find({ equipmentId }).exec();  
    // 返回查询结果  
    res.json(equipmentDetail);  
  } catch (error) {  
    console.error(error);  
    res.status(500).send('查询数据出错');  
  }  
})
const getRepairHistoryBetweenDates = async (equipmentId, startDate, endDate) => {
  try {
    const equipment = await Fault.findOne({ equipmentId });
    if (!equipment) {
      // 设备不存在
      return null;
    }

    const repairHistory = equipment.repairHistory;

    // 使用聚合框架进行筛选
    const filteredRepairHistory = repairHistory.filter((history) => {
      const repairDate = new Date(history.repairDate).getTime()
      return repairDate >=  startDate && repairDate <= endDate
    });
    return filteredRepairHistory;
  } catch (error) {
    // 处理查询过程中的错误
    console.error(error);
    throw error;
  }
};

router.post('/EquipmentDetail/RepairSearch',async(req, res) => {
// 使用示例
const equipmentIdToCheck = req.body.equipmentId // 替换成实际的设备ID
const startDateToCheck =  new Date(req.body.startDate).getTime()   // 替换成实际的起始日期
const endDateToCheck = new Date(req.body.endDate).getTime() // 替换成实际的结束日期

getRepairHistoryBetweenDates(equipmentIdToCheck, startDateToCheck, endDateToCheck)
  .then((filteredRepairHistory) => {
    if (filteredRepairHistory) {
      res.send(filteredRepairHistory)
    } else {
      res.send(null)
    }
  })
  .catch((error) => {
    console.error(error);
  });
})

router.post('/EquipmentDetail/RepairSubmit', async (req, res) => {
  try {
    const equipmentId = req.body.equipmentId;

    // 设置 repairStatus 字段
    let updateData = {};
    if (req.body.repairWay === '返厂') {
      updateData['status'] = '已返厂';
      req.body.repairStatus = '已返厂';
    } else {
      updateData['status'] = '已维修';
      req.body.repairStatus = '已维修';

    }

    // 使用 $push 操作符将数据添加到 repairHistory 数组中
    updateData['$push'] = { repairHistory: req.body };

    // 使用 $set 操作符更新 status 字段
    updateData['$set'] = { status: req.body.repairStatus };

    // 更新机器状态和 repairHistory 字段
    const equipmentDetail = await Fault.updateOne(
      { equipmentId: equipmentId },
      updateData
    );
    // 确保更新成功后发送成功响应
    if (equipmentDetail.modifiedCount > 0) {
      res.send({ success: true });
    } else {
      res.send({ success: false, message: 'Update failed or no matching document found.' });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});


router.post('/CheckAndRetrieveprotectTime',async(req, res) => {
  const result = await dbController.getProtectTimeByEquipmentId(orderEquipment,req.body.equipmentId);
  if (result != null) {
    return res.send({success:true,result:result})
  } else {
    return res.send({success:false,result:null})
  }  
})
module.exports = router;
