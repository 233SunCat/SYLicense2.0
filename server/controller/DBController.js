

async function CreateInsert(dbController, data) {
  var resultStatus;
  const InsertName = new dbController(data)
  await InsertName.save().then(result => {
    resultStatus = { success: true };
  }).catch(err => {
    resultStatus = { success: false };
  })
  return resultStatus
}
/**
 * 条件：多字段单数据，修改：多字段多数据
 * @param {A:1,B:2..} query 
 * @param {C:1,D:2..} update 
 */
async function UpdateCollectionsByCollections(dbController, query, update) {
  try {
    const result = await dbController.updateMany(query, update);
    console.log('Update result:', result.nModified, 'records modified');
    return { success: true, modifiedCount: result.nModified };
  } catch (err) {
    console.error('Update error:', err);
    return { success: false, mess: err.message };
  }
}
/**
 * query存在，修改，不存在，插入
 * @param {*} dbController 
 * @param {*} query 
 * @param {*} update 
 * @returns 
 */
async function UpdateAndInsertCollectionsByCollections(dbController, query, update) {
  try {
    const result = await dbController.updateMany(query, update, { upsert: true });
    console.log('更新结果：', result.nModified, '条记录已修改');

    // 检查结果对象中是否有upsertedCount
    const modifiedCount = result.modifiedCount !== undefined ? result.modifiedCount : result.nModified;

    return { success: true, modifiedCount };
  } catch (err) {
    console.error('更新错误：', err);
    return { success: false, error: err.message };
  }
}

/**
 * 
 * @param {*} dbController 
 * @param {*} query {}
 * @returns [{}]
 */
async function GetCollectionsByCollections(dbController, query) {
  try {
    const result = await dbController.find(query);
    return result
  } catch (error) {
    console.error('Error in findDocuments:', error);
    return result
  }
}
/**
 * 查询，返回一条数据
 * @param {*} dbController 
 * @param {*} query   {}
 * @returns [{}]
 */
async function GetCollectionsOneByCollections(dbController, query, searchKey) {
  try {
    const projection = { _id: 0 }; // 定义一个空的投影对象

    // 从searchKey数组中填充投影对象的字段
    if (Array.isArray(searchKey) && searchKey.length > 0) {
      searchKey.forEach((field) => {
        projection[field] = 1; // 将字段添加到投影对象中，值为1表示要返回该字段
      });
    }
    const result = await dbController.findOne(query, projection);
    if (result === null) {
      return { success: false, message: '返回错误' }
    }
    return { success: true, message: result }
  } catch (error) {
    console.error('在findDocuments中发生错误:', error);
    throw error; // 抛出错误，以便调用方可以处理错误
  }
}


//多条查询|条件
async function GetCollectionsByCondition(dbController, keyword, selectedOption) {//searchData[{}],startDate,endDate,selectedOption,keyword
  // 创建查询条件
  const query = {
    // faultDate: {  
    //   $gte: startDate,  
    //   $lte: endDate  
    // }  
  };
  if (selectedOption != '') {
    query.status = selectedOption
  }
  if (keyword != '') {
    const keywordRegex = new RegExp(keyword, 'i');
    query.$or = [
      { modelName: { $regex: keywordRegex } }
    ];
  }

  try {
    const resDate = await dbController.find(query).exec();
    //res.json(equipmentDetail); // 将结果以JSON格式返回给客户端 
    return resDate;
  } catch (error) {
    console.error('检索设备详情时出错：', error);
    res.status(500).send('服务器错误');
  }
}

async function GetCollections(dbController) {//searchData[{}],startDate,endDate,selectedOption,keyword

  try {
    const resDate = await dbController.find().exec();
    //res.json(equipmentDetail); // 将结果以JSON格式返回给客户端 
    return resDate;
  } catch (error) {
    console.error('检索设备详情时出错：', error);
    res.status(500).send('服务器错误');
  }
}

async function GetCollectionsByKeywordAndDate(dbController, keyword, keywordFields, startDate, endDate, dateFields) {
  var dynamicConditions
  // 构建动态查询条件
  if (dateFields.length == 0) {
    dynamicConditions = {
      $and: [
        { $or: keywordFields.map(field => ({ [field]: { $regex: keyword, $options: 'i' } })) }
      ]
    };
  } else {
    dynamicConditions = {
      $and: [
        { $or: dateFields.map(field => ({ [field]: { $gte: startDate, $lte: endDate } })) },
        { $or: keywordFields.map(field => ({ [field]: { $regex: keyword, $options: 'i' } })) }
      ]
    };
  }
  return result = await dbController.find(dynamicConditions);
}
/**
 * 判断id的值是否存在，存在返回质保期
 */
async function getProtectTimeByEquipmentId(dbController, equipmentId) {
  try {
    const equipment = await dbController.findOne({ equipmentId });

    if (equipment) {
      const protectTime = equipment.protectTime;
      const signforDate = equipment.signforDate
      return { protectTime, signforDate };
    } else {
      return null; // 如果设备不存在，可以返回 null 或者其他适当的值
    }
  } catch (error) {
    console.error('Error getting protectTime by equipmentId:', error);
    return null; // 出现错误也返回 null
  }
}
/**
 * 样机申请表查询
 */

module.exports = {
  CreateInsert, GetCollectionsByCondition,
  GetCollections,
  UpdateCollectionsByCollections,
  GetCollectionsByCollections,
  GetCollectionsByKeywordAndDate,
  getProtectTimeByEquipmentId,
  UpdateAndInsertCollectionsByCollections,
  GetCollectionsOneByCollections
};