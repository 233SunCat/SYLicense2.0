var express = require('express');
var router = express.Router();
var cors = require('cors');
var path = require('path');
const multer = require('multer'); // 用于处理 multipart/form-data 类型的数据  
const fs = require("fs")
const archiver = require('archiver')
const orderEquipment = require('../model/ShipEquipment')
const dbController = require('../controller/DBController')

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
      cb(null, './shipContracts')
    },//上传的相对路径
    //上传文件的名称
    filename: function (req, file, cb) {
      cb(null, decodeURI(file.originalname))
    }
  })
});

router.use(cors());
router.post('/upload', upload.single('file'), async(req, res) => {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = {$push: { contractFiles: req.file.originalname }}
  try {
    const result = await dbController.UpdateCollectionsByCollections(orderEquipment, query, update);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
  // 文件上传成功后的处理
  res.json({ success: true, message: 'File uploaded successfully!' });
});
/**
 * 移除文件
 */
router.post('/remove', upload.single('file'), async(req, res) => {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = {$pull: { contractFiles: req.body.fileName }}
  try {
    const result = await dbController.UpdateCollectionsByCollections(orderEquipment, query, update);
      // 删除 shipContracts 文件夹下的对应文件
      const filePath = path.join(__dirname, '../shipContracts', req.body.fileName);
      fs.unlinkSync(filePath);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
  // 文件上传成功后的处理
  res.json({ success: true, message: 'File uploaded successfully!' });
});
/**
 * 加载数据库现有文件
 */
router.post('/load', upload.single('file'), async(req, res) => {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };

  try {
    var result = await dbController.GetCollectionsByCollections(orderEquipment, query);
    if(result.length != 0){
      result = result[0].contractFiles
      return res.json(result);
    }
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
  // 文件上传成功后的处理
  res.json({ success: true, message: 'File uploaded successfully!' });
});
router.post('/download', (req, res) => {
  const directoryPath = path.join(__dirname, '..', 'shipContracts');
  const prefix = req.body.clientName + '@' + req.body.orderDate + '@';

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('读取目录时出错:', err);
      res.status(500).send('内部服务器错误');
      return;
    }
    // 根据前缀过滤文件
    const filteredFiles = files.filter(file => file.startsWith(prefix));
    if (filteredFiles.length === 0) {
      console.log('未找到匹配的文件');
      res.status(404).send('未找到匹配的文件');
      return;
    }
    const torypath = path.join(__dirname, '..', 'shipContracts',filteredFiles[0]);
    res.download(torypath, filteredFiles[0], (err) => {
      if (err) {
        console.error('File download error:', err);
        res.status(500).send('Internal Server Error');
      }else{
        console.log('文件下载成功:', filteredFiles[0]);
      }
    });
  });
});

/**
 * 验收单
 */
router.post('/inspectionUpload', upload.single('file'), async(req, res) => {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  console.log('query',query)
  delete req.body.clientName
  delete req.body.orderDate
  const update = {$push: { imspectionFiles: req.file.originalname }}
  try {
    const result = await dbController.UpdateCollectionsByCollections(orderEquipment, query, update);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
  // 文件上传成功后的处理
  res.json({ success: true, message: 'File uploaded successfully!' });
});
/**
 * 移除文件
 */
router.post('/inspectionRemove', upload.single('file'), async(req, res) => {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = {$pull: { imspectionFiles: req.body.fileName }}
  try {
    const result = await dbController.UpdateCollectionsByCollections(orderEquipment, query, update);
      // 删除 shipContracts 文件夹下的对应文件
      const filePath = path.join(__dirname, '../shipContracts', req.body.fileName);
      fs.unlinkSync(filePath);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
  // 文件上传成功后的处理
  res.json({ success: true, message: 'File uploaded successfully!' });
});
/**
 * 加载数据库现有文件
 */
router.post('/inspectionLoad', upload.single('file'), async(req, res) => {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };

  try {
    var result = await dbController.GetCollectionsByCollections(orderEquipment, query);
    if(result.length != 0){
      result = result[0].imspectionFiles
      return res.json(result);
    }
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
  // 文件上传成功后的处理
  res.json({ success: true, message: 'File uploaded successfully!' });
});
router.post('/inspectionDownload', (req, res) => {
  const directoryPath = path.join(__dirname, '..', 'shipContracts');
  const prefix = req.body.clientName + '@' + req.body.orderDate + '@';

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('读取目录时出错:', err);
      res.status(500).send('内部服务器错误');
      return;
    }
    // 根据前缀过滤文件
    const filteredFiles = files.filter(file => file.startsWith(prefix));
    if (filteredFiles.length === 0) {
      console.log('未找到匹配的文件');
      res.status(404).send('未找到匹配的文件');
      return;
    }
    const torypath = path.join(__dirname, '..', 'shipContracts',filteredFiles[0]);
    res.download(torypath, filteredFiles[0], (err) => {
      if (err) {
        console.error('File download error:', err);
        res.status(500).send('Internal Server Error');
      }else{
        console.log('文件下载成功:', filteredFiles[0]);
      }
    });
  });
});

module.exports = router;
