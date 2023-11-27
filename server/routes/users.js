var express = require('express');
var router = express.Router();
var cors = require('cors');  
const dbController = require('../controller/DBController')
const Fault = require('../model/User'); // 导入你定义的模型  

router.use(cors());  
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log(res);
});
router.post('/UserAdd', async function (req, res, next) {
  console.log(req.body)
  // 确保已经连接到数据库  

});
router.post('/UserPermissionSearch', async function (req, res, next) {
  const keyword = req.body.keyword
  const selectedOption = req.body.selectedOption
  const resDate =  await dbController.GetCollectionsByCondition(Fault,keyword, selectedOption);
  //await dbController.CreateInsert(Fault, req.body);
  console.log('resDate',resDate)
  res.send(resDate)
});


module.exports = router;

