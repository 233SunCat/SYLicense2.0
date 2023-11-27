var express = require('express');
var router = express.Router();
var cors = require('cors');
const dbController = require('../controller/DBController')
const User =require('../model/User')

router.use(cors());

router.post('/', async function (req, res, next) {

    // 确保已经连接到数据库  
    //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
    const {username, password} = req.body
    console.log('req.body',req.body)
    try {
        // 查找用户
        const user = await User.findOne({ username });
    
        // 如果用户存在，验证密码
        if (user) {
          const isPasswordMatch = (user.password === password)
          if (isPasswordMatch) {
            // 密码匹配，登录成功
            res.send('Login successful');
          } else {
            // 密码不匹配
            res.send('Invalid password');
          }
        } else {
          // 用户不存在
          res.send('User not found');
        }
      } catch (error) {
        console.error(error);
        res.send('Internal Server Error');
      }
  });
  module.exports = router;
