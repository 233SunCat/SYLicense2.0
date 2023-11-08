var express = require('express');
var router = express.Router();
var cors = require('cors');  

router.use(cors());  
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log(res);
});
router.post('/', (req, res) => {  
  const data = req.body; // 获取POST请求中的数据  
  // 处理数据并返回响应  
  console.log(data);
  res.send(req.body);
});  

module.exports = router;

