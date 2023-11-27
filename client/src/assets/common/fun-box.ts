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
  
export default {checkRequiredFields}