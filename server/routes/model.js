var express = require('express');
var router = express.Router();
var cors = require('cors');
const multer = require('multer'); // 用于处理 multipart/form-data 类型的数据  
const mongoose = require('mongoose');
const dbController = require('../controller/DBController')
const Fault = require('../model/ModelNamelist'); // 导入你定义的模型  
const modelApply = require('../model/ModelApply'); // 导入你定义的模型  
router.use(cors());


router.get('/MNlistSearch', async function (req, res, next) {
    // 确保已经连接到数据库  
    //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ',modelModule:['基础技能训练','实物训练']});
    const resDate =  await dbController.getData(Fault);
    res.send(resDate)
});

router.post('/ModelAdd', async function (req, res, next) {

    // 确保已经连接到数据库  
    //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
    const resDate =  await dbController.CreateInsert(Fault, req.data);
    res.send('resDate')
});
router.post('/ModelApply', async function (req, res, next) {

    // 确保已经连接到数据库  
    //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
    console.log(req.body)
    const resDate =  await dbController.CreateInsert(modelApply, req.body);
    res.send(resDate)
});

module.exports = router;
