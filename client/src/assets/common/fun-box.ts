import messageBox from './message-box'
//判断输入框不能为空
const checkRequiredFields = (formInline: Record<string, any>, requiredFields: string[]) => {
    const missingField = requiredFields.find(field => formInline[field] === '' || formInline[field] === null);
    if (missingField) {
      messageBox.MessageBox("输入值不能为空");
      return true;
    }else{
        return false;
    }
};
const FormDisplay = (data: any, formInline: any, formInlineCopy: any) => {
  if (data.length !== 0) {
    const latestData = data.pop();

    // 根据 receivingName 判断是否禁用
    //disabled.value = latestData.receivingName === '';

    // 使用 Object.assign 复制属性到 formInline
    Object.keys(formInline).forEach(key => {
      if (latestData.hasOwnProperty(key)) {
        formInline[key] = latestData[key];
      } else {
        formInline[key] = null; // 或者根据需要赋予默认值
      }
    });
  } else {
    //disabled.value = true;
    // 恢复 formInline 的初始状态
    Object.assign(formInline, formInlineCopy);
  }
  return formInline
};
export default {checkRequiredFields, FormDisplay}