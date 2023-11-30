var express = require('express');
var router = express.Router();
var cors = require('cors');
const multer = require('multer'); // 用于处理 multipart/form-data 类型的数据  
const mongoose = require('mongoose');
const dbController = require('../controller/DBController')
const ShipModel = require('../model/ShipModel'); // 导入你定义的模型  
const ModelApply = require('../model/ModelApply')
router.use(cors());


router.post('/ModelAdd', async function (req, res, next) {
    const result =  await dbController.CreateInsert(ShipModel, req.body);
    res.send(result)
});
router.post('/ModelApply', async function (req, res, next) {
    const result =  await dbController.CreateInsert(ModelApply, req.body);
    res.send(result)
});
router.post('/ModelApplySearch', async function (req, res, next) {
  // const query = {  
  //   applyDateApply: {  
  //     $gte: req.body.startDate,  
  //     $lte: req.body.endDate  
  //   }  
  // };  
  // if(req.body.selectedOption!=''){
  //   query.status = req.body.selectedOption
  // }
  // if(req.body.keyword!=''){
  //   const keywordRegex = new RegExp(req.body.keyword, 'i');  
  //   query.$or = [  
  //     { applyNameApply: { $regex: keywordRegex } },  
  //     { usedNameApply: { $regex: keywordRegex } } ,
  //     {usedFunctionApply:{ $regex: keywordRegex }},
  //     {modelNameApply:{ $regex: keywordRegex }},
  //     {arrivalLocationApply:{ $regex: keywordRegex }},
  //   ];  
  // }

  try {  
    const keywordArray = ['applyNameApply','usedNameApply','usedFunctionApply','modelNameApply','arrivalLocationApply']
    const DateArray = ['applyDateApply']
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const keyword = req.body.keyword
    var result = await dbController.GetCollectionsByKeywordAndDate(ModelApply, keyword, keywordArray
      , startDate, endDate, DateArray)
    res.json(result); // 将结果以JSON格式返回给客户端 
  } catch (error) {  
    console.error('检索设备详情时出错：', error);  
    res.status(500).send('服务器错误');  
  } 
});
/**
 * 获得样机库，所有样机
 */
router.post('/ModelByModelName', async function (req, res, next) {
  const query = req.body
  console.log('22222',query)
  var result = await dbController.GetCollectionsByCollections(ShipModel, query)  
  result = result.map(item => ({
    modelName:item.modelName,modelId:item.modelId,inventoryStatus:item.inventoryStatus
  }))
  console.log('result',result)
  res.send(result)
});
module.exports = router;
