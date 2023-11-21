

//多条插入，没有集合自动创建
function CreateInsert(dbController, data) {
    const InsertName = new dbController(data)
    InsertName.save().then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
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
//多条删除|条件多
function Delete(dbController, deleteId) {
    dbController.deleteMany(
        deleteId,
        function (err, rs) {
            console.log(rs);
        });

}


//多条查询|条件
async function getData(dbController,keyword,selectedOption) {//searchData[{}],startDate,endDate,selectedOption,keyword
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
async function getDatacd(dbController) {//searchData[{}],startDate,endDate,selectedOption,keyword

  try {  
    const resDate = await dbController.find().exec();  
    //res.json(equipmentDetail); // 将结果以JSON格式返回给客户端 
    return resDate;
  } catch (error) {  
    console.error('检索设备详情时出错：', error);  
    res.status(500).send('服务器错误');  
  }  
}

module.exports = { CreateInsert, Update,getData, Delete, getDatacd};