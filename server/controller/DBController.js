

async function CreateInsert(dbController, data) {
  var resultStatus;
  const InsertName = new dbController(data)
  await InsertName.save().then(result => {
      resultStatus = { success: true};
    }).catch(err => {
      resultStatus = { success: false};
    })
  return resultStatus
}

//多条更新|条件1
function Update(dbController, updatedId, updatedDate) {
    dbController.updateOne({ updatedId }, updatedDate)
        .then(() => {
            res.status(200).send('db updated successfully'); // 发送200成功响应  
        })
        .catch((error) => {
            res.status(500).send('db updating fault'); // 发送500错误响应  
        });
}
function UpdateNetwork(dbController, updatedId, updatedDate, ) {
  dbController.updateOne({ equipmentId: updatedId }, { $set: { equipmentNetwork: 1 ,protectTime: updatedData.protectTime } })
    .then(() => {
      console.log('Database updated successfully');
    })
    .catch((error) => {
      console.error('Database update error:', error);
    });
}

//多条删除|条件多
function Delete(dbController, deleteId) {
    dbController.deleteMany(
        deleteId,
        function (err, rs) {
            console.log(rs);
        });

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
    return { success: false, error: err.message };
  }
}

// 使用示例
// const query = {
//   equipmentId: 'yourEquipmentId', // 替换为你的具体 equipmentId
//   orderDate: new Date('yourOrderDate'), // 替换为你的具体 orderDate
// };
async function GetCollectionsByCollections(dbController,query) {
  try {
    const result = await dbController.find(query);
    return result
  } catch (error) {
    console.error('Error in findDocuments:', error);
    return result
  }
}

//多条查询|条件
async function GetCollectionsByCondition(dbController,keyword,selectedOption) {//searchData[{}],startDate,endDate,selectedOption,keyword
  // 创建查询条件
  const query = {  
    // faultDate: {  
    //   $gte: startDate,  
    //   $lte: endDate  
    // }  
  };  
  if(selectedOption!=''){
    query.status = selectedOption
  }
  if(keyword!=''){
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
/**
 * 根绝某个字段的数组，返货多个集合
 * @param {*数据库模型} dbController 
 * @param {*某字段名} propertyName 
 * @param {*某字段数据数组} propertysData 

 * @returns 
 */
async function GetDataByfieldNameAndfieldValues(dbController, fieldName, fieldValues) {
  try {
    if (!fieldName || !fieldValues || !Array.isArray(fieldValues) || fieldValues.length === 0) {
      throw new Error('Field name and a non-empty array of field values are required.');
    }

    const queryConditions = {
      [fieldName]: { $in: fieldValues },
    };

    const result = await dbController.find(queryConditions);
    return result;
  } catch (error) {
    console.error('Error in getDataByField:', error);
    throw error;
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
async function GetCollectionsByDateRange(dbController, startDate, endDate) {
  try {
    // 构建查询条件，限制 eveDate 在 startDate 和 endDate 之间
    const query = {
      eventDate: {
        $gte: startDate,
        $lte: endDate,
      },
    };
    const result = await dbController.find(query);
    console.log('Query result:', result);
    return result;
  } catch (error) {
    // 处理错误
    console.error('Error in QueryCollectionsByDateRange:', error);
    throw error;
  }
}
async function GetCollectionsByKeywordAndDate (dbController, keyword,keywordFields,startDate ,endDate,dateFields ){
  var dynamicConditions
  console.log('dateFields',dateFields)
  // 构建动态查询条件
  if(dateFields.length == 0){
    dynamicConditions = {
      $and: [
        { $or: keywordFields.map(field => ({ [field]: { $regex: keyword, $options: 'i' } })) }
      ]
    };
  }else{
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
async function getProtectTimeByEquipmentId(dbController,equipmentId) {
  try {
    const equipment = await dbController.findOne({ equipmentId });

    if (equipment) {
      const protectTime = equipment.protectTime;
      const signforDate = equipment.signforDate
      return {protectTime,signforDate};
    } else {
      return null; // 如果设备不存在，可以返回 null 或者其他适当的值
    }
  } catch (error) {
    console.error('Error getting protectTime by equipmentId:', error);
    return null; // 出现错误也返回 null
  }
}
module.exports = { CreateInsert, Update,GetCollectionsByCondition, Delete, 
  GetCollections, UpdateNetwork, 
  GetDataByfieldNameAndfieldValues,
  UpdateCollectionsByCollections,
  GetCollectionsByCollections,
  GetCollectionsByDateRange,
  GetCollectionsByKeywordAndDate,
  getProtectTimeByEquipmentId};