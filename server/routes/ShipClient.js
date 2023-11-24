var express = require('express');
var router = express.Router();
var cors = require('cors');
const dbController = require('../controller/DBController')
const Fault = require('../model/ShipClientMd'); // 导入你定义的模型  
const orderEquipment = require('../model/ShipEquipment')
router.use(cors());
/* GET users listing. */
router.get('/ShipMenu', async function (req, res, next) {
  const resDateEquipment = await dbController.GetCollections(orderEquipment);
  res.send(resDateEquipment)
});
router.get('/ShipClient', async function (req, res, next) {
  const resDateClient = await dbController.getDataSlideShipClient(Fault);//分别从两个数据库取出
  res.send(resDateClient)
});
router.get('/ShipAll', async function (req, res, next) {
  const resDate = await dbController.GetCollections(orderEquipment);
  res.send(resDate)
});
router.post('/', async function (req, res, next) {

  // 确保已经连接到数据库  
  //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
  const resDate = await dbController.CreateInsert(orderEquipment, req.body);
  res.send(resDate)

});
const turnDate = (originalData) => {
  const transformedData = originalData.equipmentIds.map((equipmentId, index) => {
    const newData = { ...originalData };
    newData.equipmentId = equipmentId.toString();
    delete newData.equipmentIds;

    return newData;
  });
  return transformedData
}
router.post('/AddEquipment', async function (req, res, next) {

  // 确保已经连接到数据库  
  //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
  //const resDate =  await dbController.CreateInsert(Fault, req.body);
  const data = req.body
  console.log(data)
  const arryData = turnDate(data)
  // 对 copiedDataArray 中的每个副本执行插入操作
  //console.log(arryData)
  arryData.forEach(data => {
    dbController.CreateInsert(orderEquipment, data);
  });
  //console.log(data)
  //res.send(resDate)
});
router.post('/UpdateNetwork', async function (req, res, next) {

  const data = req.body
  console.log('data', data)
  const arryData = turnDate(data)
  // const query = {
  //   equipmentId: 'yourEquipmentId', // 替换为你的具体 equipmentId
  //   orderDate: new Date('yourOrderDate'), // 替换为你的具体 orderDate
  // };

  // const update = {
  //   $set: {
  //     equipmentNetwork: 'newEquipmentNetwork', // 替换为你的新值
  //     protectTime: 'newProtectTime', // 替换为你的新值
  //   },
  // };
  console.log('arryData', arryData[0].equipmentId)
});
router.get('/GetNetwork', async function (req, res, next) {
  const name = 'equipmentId'
  const values = []
  console.log('data', req.body)
  //const data =  await dbController.GetDataByfieldNameAndfieldValues(orderEquipment,query)
  //console.log('data',data)
});
router.post('/AddShipReceiving', async function (req, res, next) {

  // 确保已经连接到数据库  
  //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
  //const resDate =  await dbController.CreateInsert(Fault, req.body);
  const data = req.body
});

router.post('/GetEquipmentByIds', async function (req, res, next) {

  // 确保已经连接到数据库  
  const equipmentIdsObject = req.body
  // 将对象的值提取为数组
  const equipmentIdsArray = Object.values(equipmentIdsObject);
  // 去除数组中的空格
  const cleanedEquipmentIdsArray = equipmentIdsArray.map(id => id.trim());
  dbController.GetDataByfieldNameAndfieldValues(orderEquipment, 'equipmentId', cleanedEquipmentIdsArray)
    .then((results) => {
      if (results && results.length > 0) {
        res.send(results)
      } else {
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

module.exports = router;
