var express = require('express');
var router = express.Router();
var cors = require('cors');
const dbController = require('../controller/DBController')
const Fault = require('../model/ShipClientMd'); // 导入你定义的模型  
const orderEquipment = require('../model/ShipEquipment')
router.use(cors());
/* GET users listing. */
router.get('/', async function (req, res, next) {
  const resDateEquipment = await dbController.getDataSlideShip(orderEquipment);//分别从两个数据库取出,数据合并
  res.send(resDateEquipment)
});
router.get('/ShipClient', async function (req, res, next) {
  const resDateClient = await dbController.getDataSlideShipClient(Fault);//分别从两个数据库取出
  res.send(resDateClient)
});
router.get('/ShipAll', async function (req, res, next) {
  const resDate = await dbController.getDatacd(orderEquipment);
  res.send(resDate)
});
router.post('/', async function (req, res, next) {

  // 确保已经连接到数据库  
  //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
  const resDate = await dbController.CreateInsert(orderEquipment, req.body);
  res.send(resDate)

});
const turnDate = (originalData) => {
  const copiedDataArray = originalData.equipmentIds.map(({ str }) => {
    const copiedData = { ...originalData };
    copiedData.equipmentId = str;
    delete copiedData.equipmentIds;
    return copiedData;
  });

  return copiedDataArray;
}
router.post('/AddEquipment', async function (req, res, next) {

  // 确保已经连接到数据库  
  //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
  //const resDate =  await dbController.CreateInsert(Fault, req.body);
  const data = req.body
  const arryData = turnDate(data)
  // 对 copiedDataArray 中的每个副本执行插入操作
  arryData.forEach(data => {
    dbController.CreateInsert(orderEquipment, data);
  });
  //console.log(data)
  //res.send(resDate)
});
router.post('/AddNetwork', async function (req, res, next) {

  // 确保已经连接到数据库  
  //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
  //const resDate =  await dbController.CreateInsert(Fault, req.body);
  const data = req.body
  console.log(data)
  const arryData = turnDate(data)
  arryData.forEach(data => {
    dbController.UpdateNetwork(orderEquipment, data.equipmentId, data);
  });
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
  dbController.GetEquipmentByIds(orderEquipment, cleanedEquipmentIdsArray)
  .then((results) => {
    if (results && results.length > 0) {
      console.log('Equipment found:', results);
      res.send(results)
    } else {
      console.log('Equipment not found');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

module.exports = router;
