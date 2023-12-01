var express = require('express');
var router = express.Router();
var cors = require('cors');
const multer = require('multer'); // 用于处理 multipart/form-data 类型的数据  
const mongoose = require('mongoose');
const dbController = require('../controller/DBController')
const ShipModel = require('../model/Model'); // 导入你定义的模型  
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
 * 获得样机库，所有样机-根据样机的名称来筛选
 */
router.post('/ModelByModelName', async function (req, res, next) {
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(ShipModel, query)  
  result = result.map(item => ({
    modelName:item.modelName,modelId:item.modelId,inventoryStatus:item.inventoryStatus,modelModule:item.modelModule
  }))
  res.send(result)
});
/**
 * 样机收货单增加
 */
router.post('/AddMTapplyReceiving', async function (req, res, next) {
  const query = { applyNameApply:  req.body.applyNameApply ,applyDateApply:req.body.applyDateApply};
  delete req.body.applyNameApply
  delete req.body.applyDateApply
  const update = req.body

  try {
    const result = await dbController.UpdateCollectionsByCollections(ModelApply, query, update);
    console.log('AddShipReceiving result:', result);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
/**
 * 收货单查询
 */
router.post('/GetMTapplyReceiving', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(ModelApply, query)
  result = result.filter(item => item.equipmentId != '')
  result = result.map(item => ({
    receivingName: item.receivingName,
    receivingPhone: item.receivingPhone,
    receivingCity: item.receivingCity,
    receivingCompany: item.receivingCompany,
    receivingCity_q: item.receivingCity_q,
    receivingDate: item.receivingDate
  }))
  console.log('result', result)
  res.send(result)
})
/**
 * 发货单查询
 */
router.post('/GetMTapplyEmail', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(ModelApply, query)
  result = result.filter(item => item.equipmentId != '')
  result = result.map(item => ({
    emailName: item.emailName,
    emailPhone: item.emailPhone,
    emailCity: item.emailCity,
    emailCompany: item.emailCompany,
    emailCity_q: item.emailCity_q,
    emailDate: item.emailDate,
    shippingCost: item.shippingCost,
    paymentMethod: item.paymentMethod
  }))
  res.send(result)
})
/**
 * 发货单增加
 */
router.post('/AddMTapplyEmail', async function (req, res, next) {
  const query = { applyNameApply:  req.body.applyNameApply ,applyDateApply:req.body.applyDateApply};
  delete req.body.applyNameApply
  delete req.body.applyDateApply
  const update = req.body
  console.log('update',update)
  console.log('query',query)
  try {
    const result = await dbController.UpdateCollectionsByCollections(ModelApply, query, update);
    console.log('AddShipReceiving result:', result);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
/**
 * 签收单查询
 */
router.post('/GetMTapplySignfor', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(ModelApply, query)
  //resut [{},{}]
  result = result.filter(item => item.equipmentId != '')
  result = result.map(item => ({
    signforName: item.signforName,
    signforPhone: item.signforPhone,
    signforDate: item.signforDate,
    inventoryStatus: item.inventoryStatus
  }))
  res.send(result)
})
/**
 * 签收单增加
 */
router.post('/AddMTapplySignfor', async function (req, res, next) {
  const query = { applyNameApply:  req.body.applyNameApply ,applyDateApply:req.body.applyDateApply};
  delete req.body.applyNameApply
  delete req.body.applyDateApply
  const update = req.body
  try {
    const result = await dbController.UpdateCollectionsByCollections(ModelApply, query, update);
    console.log('AddShipReceiving result:', result);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
/**
 * 样机增加
 */
router.post('/AddMTapplyModel', async function (req, res, next) {
  const query = { applyNameApply:  req.body.applyNameApply ,applyDateApply:req.body.applyDateApply};
  delete req.body.applyNameApply
  delete req.body.applyDateApply
  const update = req.body
  console.log('添加样机',update,query)
  try {
    const result = await dbController.UpdateCollectionsByCollections(ModelApply, query, update);
    console.log('AddShipReceiving result:', result);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
/**
 * 样机查询
 */
router.post('/GetMTapplyModel', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(ModelApply, query)
  //resut [{},{}]
  result = result.map(item => ({
    modelName:item.modelNameAllocation,
    modelId:item.modelIdAllocation,
    inventoryStatus:item.modelInventoryStatusAllocation,
    modelModule:item.modelModuleAllocation
  }))
  res.send(result)
})
/**
 * 所有样机查询
 */
router.get('/ModelMenu', async function (req, res, next) {
  const resDateEquipment = await dbController.GetCollections(ShipModel);
  res.send(resDateEquipment)
});
module.exports = router;
