
var express = require('express');
var router = express.Router();
var cors = require('cors');
const InsertEquipment = require('../controller/EquipmentController')
const Fault = require('../model/Equipment'); // 导入你定义的模型  
const multer = require('multer'); // 用于处理 multipart/form-data 类型的数据  
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads')
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage })
router.use(cors());
/* GET users listing. */
// router.get('/EquipmentSearch', function (req, res, next) {
//   //查询所有的设备报修数据
//   res.send('链接服务端成功');
// });

// router.post('/', (req, res) => {
//   const data = req.body; // 获取POST请求中的数据  
//   console.log('11111111111111')
//   console.log(req.body);
//   const clientName = req.body.clientName;
//   // const equipmentName = req.body.equipmentName;
//   // const equipmentId = req.body.equipmentId;
//   // const faultDate = req.body.faultDate;
//   // const faultPhenomenon = req.body.faultPhenomenon;
//   // const notes = req.body.notes;
//   const newFault = new Fault({
//     clientName,
//     // equipmentName,
//     // equipmentId,
//     // faultDate,
//     // faultPhenomenon,
//     // notes
//   });
//   newFault.save()
//     .then(() => {
//       //console.log('Fault saved successfully:', newFault);
//       res.status(200).send('Fault saved successfully'); // 发送200成功响应 
//       return;  // 添加这一行，确保之后的代码不会执行  
//     })
//     .catch((error) => {
//       //console.error('Error saving fault:', error);
//       res.status(500).send('Error saving fault'); // 发送500错误响应  
//     });
//   return;  // 添加这一行，确保之后的代码不会执行  
// });

router.post('/EquipmentSubmit', upload.single('file'), (req, res) => {
  // req.file 是 'file' 文件的信息  
  // req.body 将包含文本域的数据，如果有的话  
  //res.send(req.file);
  var imageVideo = '';
  if (req.file && req.file.path) {
    imageVideo = req.file.path;
    // 其他使用imageVideo的代码  
  }
  const clientName = req.body.clientName;
  const equipmentName = req.body.equipmentName;
  const equipmentId = req.body.equipmentId;
  const faultDate = req.body.faultDate;
  const faultPhenomenon = req.body.faultPhenomenon;
  const notes = req.body.notes;
  const qualityDate = 2;
  const status = '待维修';
  const newFault = new Fault({
    clientName,
    equipmentName,
    equipmentId,
    faultDate,
    faultPhenomenon,
    imageVideo,
    notes,
    qualityDate,
    status
  });
  newFault.save()
    .then(() => {
      //console.log('Fault saved successfully:', newFault);
      res.status(200).send('Fault saved successfully'); // 发送200成功响应 
      return;  // 添加这一行，确保之后的代码不会执行  
    })
    .catch((error) => {
      //console.error('Error saving fault:', error);
      res.status(500).send('Error saving fault'); // 发送500错误响应  
    });
  return;  // 添加这一行，确保之后的代码不会执行  
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
      { equipmentId: { $regex: keywordRegex } }  
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

router.post('/EquipmentDetail/RepairHistory',async(req, res) => {
  //const data = await Fault.find()
  // 创建查询条件
  const query = {  
    status: '已维修',  
    faultDate: {  
      $gte: req.body.startDate,  
      $lte: req.body.endDate  
    }  
  };  
  try {  
    const equipmentDetail = await Fault.find(query).exec();  
    res.json(equipmentDetail); // 将结果以JSON格式返回给客户端 
  } catch (error) {  
    console.error('检索设备详情时出错：', error);  
    res.status(500).send('服务器错误');  
  }  
})
router.post('/EquipmentDetail/RepairSubmit',async(req, res) => {
  //const data = await Fault.find()
  // 创建查询条件
  const equipmentId = req.body.equipmentId;
  const repairEngineer = req.body.repairEngineer;
  const repairTime = req.body.repairTime;
  const repairLocation = req.body.repairLocation;
  const repairMoney = req.body.repairMoney;
  const repairContext = req.body.repairContext;
  const repairNotes = req.body.repairNotes;

  const status = '已维修';
  const updateFault = {  
    $set: {  
      repairEngineer,  
      repairTime,  
      repairLocation,  
      repairMoney,  
      repairContext,  
      repairNotes, 
      status
    }  
  };  
    
  Fault.updateOne({ equipmentId }, updateFault)  
    .then(() => {  
      res.status(200).send('Fault updated successfully'); // 发送200成功响应  
    })  
    .catch((error) => {  
      res.status(500).send('Error updating fault'); // 发送500错误响应  
    });
})

module.exports = router;
