<template>
    <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
        <el-form el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"
            style="max-width: 460px;width: 40%;">
            <el-form-item label="用户名称">
                <el-input style="width: 100%;" v-model="formInline.clientName" placeholder="用户名称" clearable />
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select style="width: 100%;" v-model="formInline.orderStatus" placeholder="订单状态" clearable>
                    <el-option label="已中标" value="已中标" />
                    <el-option label="未中标" value="未中标" />
                </el-select>
            </el-form-item>
            <el-form-item label="中标时间">
                <el-date-picker style="width: 100%;" v-model="formInline.orderDate" type="datetime" placeholder="请选择中标时间"
                :default-time="defaultTime"  clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormProps } from 'element-plus'
import axiosServer from '../assets/common/axios-server'
import messageBox from '../assets/common/message-box'
const labelPosition = ref<FormProps['labelPosition']>('right')
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const formInline = reactive({//这里就是获取的数据
    clientName: '',
    orderStatus: '',
    orderDate: Date(),
})
/**
 * 判断输入框是否为空
 */
const InputStatu = () => {
    if (
        formInline.clientName == "" ||
        formInline.orderStatus == ""
    ) {
        messageBox.MessageBox('输入不得为空')
        return 0;
    }else{
        return 1
    }
}
/**
 * 输入框清空
 */
const InputClear = () => {
    formInline.clientName = ''
    formInline.orderStatus = ''
    formInline.orderDate = Date()
}
const onSubmit = () => {
    if(InputStatu() == 0){return} 
    axiosServer.AxiosPost(formInline,'/ShipClient/AddShip').then(res=>{
        console.log('res',res)
        if(res.success == true){
            messageBox.MessageBox('保存成功')
            InputClear()
        }else{
            messageBox.MessageBox('保存失败')
        }
    })
}
</script>
  
<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}
</style>
  