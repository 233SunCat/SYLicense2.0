var express = require('express');
var router = express.Router();
var cors = require('cors');
var path = require('path');
const multer = require('multer'); // 用于处理 multipart/form-data 类型的数据  
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './downloads')
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage })


router.use(cors());
router.get('/SYGenInfo', (req, res) => {
  const filePath = path.join(__dirname, '..', 'downloads', 'SYGenInfo.exe');
  console.log('filePath', filePath)
  res.download(filePath, 'SYGenInfo.exe', (err) => {
    if (err) {
      console.error('File download error:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

router.post('/tenpinfo', upload.single('file'), (req, res) => {
  // 文件上传成功后的处理
  res.json({ success: true, message: 'File uploaded successfully!' });
});
router.get('/faultImage/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log('filename',filename)
  const imagePath = path.join(__dirname, '..', 'uploads',filename);
  console.log('imagePath',imagePath)
  res.sendFile(imagePath);
});
router.get('/faultImage/videos/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log('视频filename',filename)
  const imagePath = path.join(__dirname, '..', 'videos',filename);
  console.log('imagePath',imagePath)
  res.sendFile(imagePath);
});

module.exports = router;
