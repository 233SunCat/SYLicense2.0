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
router.post('/', async function (req, res, next) {

  // 确保已经连接到数据库  
  //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
  const resDate =  await dbController.CreateInsert(Fault, req.data);
  res.send(resDate)
});

module.exports = router;

