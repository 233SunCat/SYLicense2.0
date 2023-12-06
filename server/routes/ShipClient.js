var express = require('express');
var router = express.Router();
var cors = require('cors');
const dbController = require('../controller/DBController')
const shipOrder = require('../model/ShipOrder')

const orderShipEvent = require('../model/ShipEvent')


router.use(cors());
/**
 * 增加订单，中标
 */
router.post('/AddShip', async function (req, res, next) {
  const resDate = await dbController.CreateInsert(shipOrder, req.body);
  res.send(resDate)
});
/**
 * 订单信息
 */
router.get('/ShipMenu', async function (req, res, next) {
  const resDateEquipment = await dbController.GetCollections(shipOrder);
  return res.json(resDateEquipment)

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
router.post('/GetShipEmailiByOrderDateAndClientName', async function (req, res, next) {
  const query = req.body
  const result = await dbController.GetCollectionsByCollections(shipOrder, query)
  result = result.filter(item => item.equipmentId != '')
  result = result.map(item => ({
    emailName: item.emailName, emailPhone: item.emailPhone, emailCity: item.emailCity,
    emailCompany: item.emailCompany, emailCity_q: item.emailCity_q,
    emailDate: item.emailDate
  }))
})
/**
 * 用户信息-查询
 */
router.post('/GetShipUserStatus', async function (req, res, next) {
  const query = req.body
  const searchKey = ['clientName', 'orderStatus', 'clientArea', 'clientProvince', 'clientUrban', 'clientLevel']
  var result = await dbController.GetCollectionsOneByCollections(shipOrder, query, searchKey)
  result = result.message
  return res.json(result);

})
/**
 * 用户信息-增加
 */
router.post('/AddShipUserStatus', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  const result = await dbController.UpdateCollectionsByCollections(shipOrder, query, update);
  // 根据需要处理 result
  return res.json(result)
});
/**
/**
 * 设备名称查询
 */
router.post('/GetShipEquipmentNames', async function (req, res, next) {
  const query = req.body
  try {
    var result = await dbController.GetCollectionsByCollections(shipOrder, query)
    if (result.length == 0) {
      return res.status(500).json({ success: false, error: '数据库没有该订单的文档' });
    }
    result = result.map(item => item.equipment)
    return res.json(result[0]);
  } catch (error) {
    console.error('GetShipEquipmentNames error:', error);
    return res.status(500).json({ success: false, error: '网络错误' });
  }
})
/**
 * 设备添加
 */
router.post('/AddShipEquipment', async function (req, res, next) {
  const data = req.body;
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  const arryData = turnDate(data);
  try {
    const shipClient = await shipOrder.findOne(query);
    console.log('shipClient', shipClient)
    if (!shipClient) {
      // 如果找不到对应文档，可以根据需要进行处理
      return res.send({ success: false, message: '找不到对应的 ShipClient 文档' })
    }

    const updateResult = await shipOrder.updateMany(
      query,
      { $push: { 'equipment': arryData } }
    );
    // 保存更新后的 ShipClient 文档
    await shipClient.save();

    return res.send({ success: true, message: '数据更新成功' })
  } catch (error) {
    console.error('error:', error);
    return res.send({ success: false, message: '数据更新失败' })
  }
});
/**
 * 联网-增加
 */
router.post('/AddShipNetwork', async function (req, res, next) {
  const query = {
    clientName: req.body.clientName,
    orderDate: req.body.orderDate,
    'equipment.equipmentId': { $in: req.body.equipmentIds }
  };
  try {
    // 使用 $set 操作符更新匹配的子文档中的 equipmentNetwork 值
    const updateResult = await shipOrder.updateMany(
      query,
      { $set: { 'equipment.$[elem].equipmentNetwork': '是', 'equipment.$[elem].protectTime': req.body.protectTime } },
      { arrayFilters: [{ 'elem.equipmentId': { $in: req.body.equipmentIds } }] }
    );
    console.log('updateResult', updateResult)
    return res.json({ success: true, message: '数据更新成功' })
  } catch (error) {
    console.error('AddShipReceiving error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * 联网查询
 */
router.post('/GetShipNetwork', async function (req, res, next) {
  const query = req.body
  const searchKey = ['equipment']
  var result = await dbController.GetCollectionsOneByCollections(shipOrder, query, searchKey)
  result = result.message.equipment
  return res.json(result);
})
/**
 * 收货单查询
 */
router.post('/GetShipReceiving', async function (req, res, next) {
  const query = req.body
  const searchKey = ['receivingName', 'receivingPhone', 'receivingCity', 'receivingCompany', 'receivingCity_q', 'receivingDate']
  var result = await dbController.GetCollectionsOneByCollections(shipOrder, query, searchKey)
  result = result.message
  return res.json(result)
})
/**
 * 收货单增加
 */
router.post('/AddShipReceiving', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  const result = await dbController.UpdateCollectionsByCollections(shipOrder, query, update);
  // 根据需要处理 result
  return res.json(result);
});
/**
 * 发货单查询
 */
router.post('/GetShipEmail', async function (req, res, next) {
  const query = req.body
  const searchKey = ['emailName', 'emailPhone', 'emailCity', 'emailCompany', 'emailCity_q', 'emailDate', 'shippingCost', 'paymentMethod']
  var result = await dbController.GetCollectionsOneByCollections(shipOrder, query, searchKey)
  result = result.message
  return res.json(result)
})
/**
 * 发货单增加
 */
router.post('/AddShipEmail', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  const result = await dbController.UpdateCollectionsByCollections(shipOrder, query, update);
  // 根据需要处理 result
  return res.json(result);
});
/**
 * 签收单查询
 */
router.post('/GetSignfor', async function (req, res, next) {
  const query = req.body
  const searchKey = ['signforName', 'signforPhone', 'signforDate', 'inventoryStatus']
  var result = await dbController.GetCollectionsOneByCollections(shipOrder, query, searchKey)
  result = result.message
  return res.json(result)
})
/**
 * 签收单增加
 */
router.post('/AddSignfor', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  const result = await dbController.UpdateCollectionsByCollections(shipOrder, query, update);
  // 根据需要处理 result
  return res.json(result);
});
/**
 * 验收单查询
 */
router.post('/GetShipAccept', async function (req, res, next) {
  const query = req.body
  const searchKey = ['acceptName', 'acceptPhone', 'acceptDate']
  var result = await dbController.GetCollectionsOneByCollections(shipOrder, query, searchKey)
  result = result.message
  return res.json(result)
})
/**
 * 验收单增加
 */
router.post('/AddShipAccept', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  const result = await dbController.UpdateCollectionsByCollections(shipOrder, query, update);
  // 根据需要处理 result
  return res.json(result);
});
/**
 * 合同查询
 */
router.post('/GetShipContracts', async function (req, res, next) {
  const query = req.body
  const searchKey = ['dealer', 'contractSignDate', 'contractMoney',
    'paymentDate', 'winningBidPrice', 'serviceFee',
    'invoiceStatus', 'invoiceDate', 'invoiceNumber',
    'paymentMethod']
  var result = await dbController.GetCollectionsOneByCollections(shipOrder, query, searchKey)
  result = result.message
  return res.json(result)
})
/**
 * 合同增加
 */
router.post('/AddShipContracts', async function (req, res, next) {
  const query = { clientName: req.body.clientName, orderDate: req.body.orderDate };
  delete req.body.clientName
  delete req.body.orderDate
  const update = req.body
  const result = await dbController.UpdateCollectionsByCollections(shipOrder, query, update);
  // 根据需要处理 result
  return res.json(result);
});
/**
 * 订单事件查询
 */
router.post('/GetShipEvent', async function (req, res, next) {
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
  var result = await dbController.GetCollectionsByCollections(orderShipEvent, query)
  res.send(result)
})
/**
 * 订单事件增加
 */
router.post('/AddShipEvent', async function (req, res, next) {
  const dataToStatus = await dbController.CreateInsert(orderShipEvent, req.body)
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
    "设备名称": "equipmentName",
    "设备编号": "equipmentId",
    "设备型号": "equipmentStyle",
    "设备模块": "equipmentModule",
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
  var document = []
  // var client = await dbController.GetCollectionsByKeywordAndDate(shipOrder, keyword, keywordArray
  //   , startDate, endDate, DateArray)
  var client = await dbController.GetCollections(shipOrder)
  // 创建一个新的数组，每个元素都是提升equipment子文档字段后的文档对象
  client.forEach(item => {
    item.equipment.forEach(itemSub => {
      var dic = {}
      dic.equipmentName = itemSub._doc.equipmentName
      dic.equipmentStyle = itemSub._doc.equipmentStyle
      dic.equipmentId = itemSub._doc.equipmentId
      dic.protectTime = itemSub._doc.protectTime
      dic.equipmentNetwork = itemSub._doc.equipmentNetwork
      dic.equipmentModule = itemSub._doc.equipmentModule
      //client
      dic.clientName = item.clientName
      dic.clientArea = item.clientArea
      dic.clientProvince = item.clientProvince
      dic.clientUrban = item.clientUrban
      dic.clientLevel = item.clientLevel
      dic.orderStatus = item.orderStatus

      dic.orderDate = item.orderDate
      dic.protectTime = item.protectTime
      dic.receivingName = item.receivingName
      dic.receivingPhone = item.receivingPhone
      dic.receivingCity = item.receivingCity
      dic.receivingCompany = item.receivingCompany
      dic.receivingCity_q = item.receivingCity_q
      dic.receivingDate = item.receivingDate
      dic.emailName = item.emailName
      dic.emailPhone = item.emailPhone
      dic.emailCity = item.emailCity
      dic.emailCompany = item.emailCompany

      dic.emailCity_q = item.emailCity_q
      dic.emailDate = item.emailDate
      dic.shippingCost = item.shippingCost
      dic.paymentMethod = item.paymentMethod
      dic.signforName = item.signforName
      dic.signforPhone = item.signforPhone
      dic.signforDate = item.signforDate
      dic.inventoryStatus = item.inventoryStatus
      dic.acceptName = item.acceptName
      dic.acceptPhone = item.acceptPhone
      dic.acceptDate = item.acceptDate

      dic.dealer = item.dealer
      dic.contractSignDate = item.contractSignDate
      dic.contractMoney = item.contractMoney
      dic.paymentDate = item.paymentDate
      dic.winningBidPrice = item.winningBidPrice
      dic.serviceFee = item.serviceFee
      dic.invoiceStatus = item.invoiceStatus

      dic.invoiceDate = item.invoiceDate
      dic.invoiceNumber = item.invoiceNumber
      document.push(dic)
    })
  })

  var dynamicConditions;

  // 构建动态查询条件
  if (DateArray.length == 0) {
    // 如果没有日期字段，只使用关键字字段构建查询条件
    dynamicConditions = document.filter(item =>
      keywordArray.some(field => item[field] && item[field].toString().toLowerCase().includes(keyword.toLowerCase()))
    );
  } else {
    // 如果有日期字段，使用关键字字段和日期字段构建查询条件
    dynamicConditions = document.filter(item =>
      DateArray.some(field => item[field] && new Date(item[field]) >= startDate && new Date(item[field]) <= endDate) &&
      keywordArray.some(field => item[field] && item[field].toString().toLowerCase().includes(keyword.toLowerCase()))
    );
  }
  res.send(dynamicConditions)
})
module.exports = router;
