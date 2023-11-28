var express = require('express');
var router = express.Router();
var cors = require('cors');
const dbController = require('../controller/DBController')
const Fault = require('../model/ShipClientMd'); // 导入你定义的模型  
const orderEquipment = require('../model/ShipEquipment')
const orderShipEvent = require('../model/ShipEvent')


router.use(cors());
/**
 * 增加订单，中标
 */
router.post('/AddShip', async function (req, res, next) {
  //dbController.CreateInsert(Fault, {modelName:'虚实结合腹腔镜',modelStyle:'BBQ'});
  const resDate = await dbController.CreateInsert(orderEquipment, req.body);
  res.send(resDate)
});
/**
 * 订单信息
 */
router.get('/ShipMenu', async function (req, res, next) {
  const resDateEquipment = await dbController.GetCollections(orderEquipment);
  res.send(resDateEquipment)
});
router.get('/ShipClient', async function (req, res, next) {
  console.log('/ShipClient')
  const resDateClient = await dbController.getDataSlideShipClient(Fault);//分别从两个数据库取出
  res.send(resDateClient)
})
router.get('/ShipAll', async function (req, res, next) {
  const resDate = await dbController.GetCollections(orderEquipment);
  res.send(resDate)
});

const turnDate = (originalData) => {
  const transformedData = originalData.equipmentIds.map((equipmentId, index) => {
    const newData = { ...originalData };
    newData.equipmentId = equipmentId.toString();
    delete newData.equipmentIds;
    return newData;
  });
  return transformedData
}

router.post('/UpdateNetwork', async function (req, res, next) {

  const data = req.body
  const arryData = turnDate(data)
});
router.get('/GetNetwork', async function (req, res, next) {
  const name = 'equipmentId'
  const values = []
  console.log('data', req.body)
  //const data =  await dbController.GetDataByfieldNameAndfieldValues(orderEquipment,query)
  //console.log('data',data)
});


router.post('/GetEquipmentByIds', async function (req, res, next) {

  // 确保已经连接到数据库  
  const equipmentIdsObject = req.body
  // 将对象的值提取为数组
  const equipmentIdsArray = Object.values(equipmentIdsObject);
  // 去除数组中的空格
  const cleanedEquipmentIdsArray = equipmentIdsArray.map(id => id.trim());
  dbController.GetDataByfieldNameAndfieldValues(orderEquipment, 'equipmentId', cleanedEquipmentIdsArray)
    .then((results) => {
      if (results && results.length > 0) {
        res.send(results)
      } else {
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
router.post('/GetShipEmailiByOrderDateAndClientName', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  const result = await dbController.GetCollectionsByCollections(orderEquipment, query)
  result = result.filter(item => item.equipmentId != '')
  result = result.map(item => ({
    emailName: item.emailName, emailPhone: item.emailPhone, emailCity: item.emailCity,
    emailCompany: item.emailCompany, emailCity_q: item.emailCity_q,
    emailDate: item.emailDate
  }))
})
/**
 * 发货用户信息查询
 */
router.post('/GetShipUserStatus', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(orderEquipment, query)
  res.send(result)
})
/**
 * 发货用户信息增加
 */
router.post('/AddShipUserStatus', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  try {
    const result = await dbController.UpdateCollectionsByCollections(orderEquipment, query, update);
    console.log('AddShipUserStatus result:', result);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipUserStatus error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
/**
/**
 * 设备名称查询
 */
router.post('/GetShipEquipmentNames', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(orderEquipment, query)
  result = result.filter(item => item.equipmentId != '')
  res.send(result)
})
/**
 * 设备添加
 */
router.post('/AddShipEquipment', async function (req, res, next) {
  const data = req.body;
  const arryData = turnDate(data);
  try {
    const insertPromises = arryData.map(data => dbController.CreateInsert(orderEquipment, data));
    const results = await Promise.all(insertPromises);
    // 检查结果并发送响应
    const success = results.every(result => result.success);
    if (success) {
      res.status(200).json({ success: true, message: '所有数据成功插入' });
    } else {
      res.status(500).json({ success: false, message: '部分数据插入失败' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '内部服务器错误' });
  }
});
/**
 * 联网查询
 */
router.post('/GetShipNetwork', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(orderEquipment, query)
  result = result.filter(item => item.equipmentId != '')
  result = result.map(item => ({
    networdkEqNumber: item.networdkEqNumber,
    equipmentIds: item.equipmentIds,
    protectTime: item.protectTime,
  }))
  res.send(result)
})
/**
 * 收货单查询
 */
router.post('/GetShipReceiving', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(orderEquipment, query)
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
 * 收货单增加
 */
router.post('/AddShipReceiving', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  try {
    const result = await dbController.UpdateCollectionsByCollections(orderEquipment, query, update);
    console.log('AddShipReceiving result:', result);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
/**
 * 发货单查询
 */
router.post('/GetShipEmail', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(orderEquipment, query)
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
router.post('/AddShipEmail', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  try {
    const result = await dbController.UpdateCollectionsByCollections(orderEquipment, query, update);
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
router.post('/GetSignfor', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(orderEquipment, query)
  //resut [{},{}]
  result = result.filter(item => item.equipmentId != '')
  result = result.map(item => ({
    signforName: item.signforName,
    signforPhone: item.signforPhone,
    signforDate: item.signforDate,
    inventoryStatus: item.inventoryStatus
  }))
  console.log('签收单',result)
  res.send(result)
})
/**
 * 签收单增加
 */
router.post('/AddSignfor', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  try {
    const result = await dbController.UpdateCollectionsByCollections(orderEquipment, query, update);
    console.log('AddShipReceiving result:', result);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
/**
 * 验收单查询
 */
router.post('/GetShipAccept', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  var result = await dbController.GetCollectionsByCollections(orderEquipment, query)
  //resut [{},{}]
  result = result.filter(item => item.equipmentId != '')
  result = result.map(item => ({
    acceptName: item.acceptName,
    acceptPhone: item.acceptPhone,
    acceptDate: item.acceptDate,
  }))
  res.send(result)
})
/**
 * 验收单增加
 */
router.post('/AddShipAccept', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  try {
    const result = await dbController.UpdateCollectionsByCollections(orderEquipment, query, update);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
/**
 * 合同查询
 */
router.post('/GetShipContracts', async function (req, res, next) {
  //req.body { clientName: '苏州医院', orderDate: '2020-10-16T00:00:00.000Z' }
  const query = req.body
  console.log('合同的query', query)
  var result = await dbController.GetCollectionsByCollections(orderEquipment, query)
  //resut [{},{}]
  result = result.filter(item => item.equipmentId != '')
  result = result.map(item => ({
    dealer: item.dealer,
    contractSignDate: item.contractSignDate,
    contractMoney: item.contractMoney,
    paymentDate: item.paymentDate,
    winningBidPrice: item.winningBidPrice,
    serviceFee: item.serviceFee,
    invoiceStatus: item.invoiceStatus,
    invoiceDate: item.invoiceDate,
    invoiceNumber: item.invoiceNumber,
    paymentMethod: item.paymentMethod,
  }))
  res.send(result)
})
/**
 * 合同增加
 */
router.post('/AddShipContracts', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  try {
    const result = await dbController.UpdateCollectionsByCollections(orderEquipment, query, update);
    console.log('AddShipReceiving result:', result);
    // 根据需要处理 result
    return res.json(result);
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
/**
 * 订单事件查询
 */
router.post('/GetShipEvent', async function (req, res, next) {
  console.log('req', req.body)
  const startDate = req.body.startDate
  const endDate = req.body.endDate
  const query = {
    eventDate: {
      $gte: startDate,
      $lte: endDate,
    },
    clientName: req.body.clientName,
    orderDate: req.body.orderDate
  };
  console.log('query', query)
  var result = await dbController.GetCollectionsByCollections(orderShipEvent, query)
  res.send(result)
})
/**
 * 订单事件增加
 */
router.post('/AddShipEvent', async function (req, res, next) {
  const dataToStatus = await dbController.CreateInsert(orderShipEvent, req.body)
  console.log('dataToStatus', dataToStatus)
  res.send(dataToStatus)
});

function findKeysByValues(mappingObject, targetObject) {
  const result = [];
  for (const [key, value] of Object.entries(mappingObject)) {
    value.forEach(item => {
      if (targetObject.hasOwnProperty(item)) {
        result.push(targetObject[item])
      }
    })
  }
  return result;
}
/**
 * 用户订单总表查询
 */
router.post('/GetShipSearch', async function (req, res, next) {
  const targetKeyword = {
    "用户名称": "clientName",
    "订单状态": "orderStatus",
    "订单设备名称": "equipmentName",
    "订单设备编号": "equipmentId",
    "订单设备型号": "equipmentStyle",
    "订单设备模块": "equipmentModule",
    "是否联网": "equipmentNetwork",
    "质保期": "protectTime",
    "收货人姓名": "receivingName",
    "收货人手机号": "receivingPhone",
    "收货地址": "receivingCity",
    "收货机构": "receivingCompany",
    "详细收货地址": "receivingCity_q",
    "发货人姓名": "emailName",
    "发货人手机号": "emailPhone",
    "发货城市": "emailCity",
    "发货机构": "emailCompany",
    "详细发货地址": "emailCity_q",
    "物流费用": "shippingCost",
    "支付方式": "paymentMethod",
    "签收人姓名": "signforName",
    "签收人手机号": "signforPhone",
    "是否在库": "inventoryStatus",
    "验收方姓名": "acceptName",
    "验收方手机号": "acceptPhone",
    "代理商信息": "dealer",
    "合同签订金额": "contractMoney",
    "付款方式": "paymentMethod",
    "中标价格": "winningBidPrice",
    "服务费": "serviceFee",
    "开票情况": "invoiceStatus",
    "开票编号": "invoiceNumber"
  };
  const targetDate = {
    "订单时间": "orderDate",
    "期望到货时间": "receivingDate",
    "发货时间": "emailDate",
    "签收日期": "signforDate",
    "验收日期": "acceptDate",
    "合同签订日期": "contractSignDate",
    "付款日期": "paymentDate",
    "开票日期": "invoiceDate",
  }
  const mappingObject = req.body.formInline
  const keywordArray = findKeysByValues(mappingObject, targetKeyword);
  const DateArray = findKeysByValues(mappingObject, targetDate);
  const startDate = req.body.startDate
  const endDate = req.body.endDate
  const keyword = req.body.keyword
  var result = await dbController.GetCollectionsByKeywordAndDate(orderEquipment, keyword, keywordArray
    , startDate, endDate, DateArray)
  res.send(result)
})
module.exports = router;
