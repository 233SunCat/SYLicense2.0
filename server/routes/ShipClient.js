var express = require('express');
var router = express.Router();
var cors = require('cors');
const dbController = require('../controller/DBController')
const Fault = require('../model/ShipClientMd'); // 导入你定义的模型  

router.use(cors());
/* GET users listing. */
router.get('/', async function (req, res, next) {
  const resDate = await dbController.getDatacd(Fault);
  res.send(resDate)
});
router.post('/', async function (req, res, next) {

  // 确保已经连接到数据库  
  //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
  const resDate = await dbController.CreateInsert(Fault, req.body);
  res.send(resDate)

});
router.post('/AddEquipment', async function (req, res, next) {

  // 确保已经连接到数据库  
  //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
  //const resDate =  await dbController.CreateInsert(Fault, req.body);
  const data = req.body
  console.log(data.equipmentIds)
  //res.send(resDate)


});

module.exports = router;
