var express = require('express');
var router = express.Router();
var cors = require('cors');
var path = require('path');
const multer = require('multer'); // 用于处理 multipart/form-data 类型的数据  
const fs = require("fs")
const archiver = require('archiver')
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './shipContracts')
  },
  filename(req, file, cb) {
    cb(null, req.body.clientName + '@'+req.body.orderDate+'@' + file.originalname)
  }
})
const upload = multer({ storage })
router.use(cors());


router.post('/upload', upload.single('file'), (req, res) => {
  console.log('上传相关附件',req.body.clientName)
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


module.exports = router;
