var express = require('express');
var router = express.Router();
var cors = require('cors');
var path = require('path');
const multer = require('multer'); // 用于处理 multipart/form-data 类型的数据  
const fs = require("fs")
const archiver = require('archiver')
const equipmentModules = require('../model/Modules')
const dbController = require('../controller/DBController');
const { Console } = require('console');

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
      cb(null, './modules')
    },//上传的相对路径
    //上传文件的名称
    filename: function (req, file, cb) {
      cb(null, decodeURI(file.originalname))
    }
  })
});

router.use(cors())
router.post('/upload', upload.single('file'), async(req, res) => {
  const query = { equipmentName: req.body.equipmentName };
  const update = { moduleFile: req.file.originalname }
  try {
    console.log(query,update)
    const result = await dbController.UpdateAndInsertCollectionsByCollections(equipmentModules, query, update);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
  文件上传成功后的处理
  res.json({ success: true, message: 'File uploaded successfully!' });
});

module.exports = router;
