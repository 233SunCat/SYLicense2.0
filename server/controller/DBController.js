

//多条插入，没有集合自动创建
function CreateInsert(dbController, data) {
    const InsertName = new dbController(data)
    InsertName.save().then(result => {
        //console.log(result)
    }).catch(err => {
        //console.log(err)
    })
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
 * 条件：多字段单数据，修改：多字段单数据
 * @param {A:1,B:2..} query 
 * @param {C:1,D:2..} update 
 */
async function UpdateCollectionsByCollections(query, update) {
  try {
    const result = await YourModel.updateMany(query, update);
    //console.log('Update result:', result);
  } catch (error) {
    //console.error('Error in updateDocuments:', error);
    throw error;
  }
}
/**
 * 
 * @param {*} query 
 */
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
    throw error;
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

module.exports = { CreateInsert, Update,GetCollectionsByCondition, Delete, GetCollections, UpdateNetwork, GetDataByfieldNameAndfieldValues,UpdateCollectionsByCollections,
  GetCollectionsByCollections};