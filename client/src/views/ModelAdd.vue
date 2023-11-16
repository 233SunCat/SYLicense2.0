<template>
    <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
        <el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"
            style="max-width: 460px;width: 40%;">
            <el-form-item label="设备名称">
                <el-select style="width: 100%;" v-model="formInline.modelName" placeholder="设备名称" clearable>
                    <el-option label="力反馈腹腔镜" value="力反馈腹腔镜" />
                    <el-option label="虚实结合腹腔镜" value="虚实结合腹腔镜" />
                </el-select> </el-form-item>
            <el-form-item label="设备型号">
                <el-select style="width: 100%;" v-model="formInline.modelStyle" placeholder="设备名称" clearable>
                    <el-option label="已中标" value="已中标" />
                    <el-option label="未中标" value="未中标" />
                </el-select>
            </el-form-item>
            <el-form-item label="生产日期">
                <el-date-picker style="width: 100%;" v-model="formInline.produceDate" type="date" placeholder="选择生产日期"
                    clearable />
            </el-form-item>
            <el-form-item label="设备编号">
                <el-input style="width: 100%;" v-model="formInline.modelId" placeholder="输入设备编号" clearable />
            </el-form-item>

            <el-form-item label="软件版本">
                <el-input style="width: 100%;" v-model="formInline.softwareVersion" placeholder="输入软件版本" clearable />
            </el-form-item>
            <el-form-item label="是否在库">
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                                    city
                                }}</el-checkbox>
                            </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>
//模块
import { ref, reactive } from 'vue'
import axios from "axios";
import type { FormProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

//数据
const labelPosition = ref<FormProps['labelPosition']>('right')
const formInline = reactive({//这里就是获取的数据
    modelName: '',
    modelId: '',
    produceDate: '',
    softwareVersion: '',
    modelStyle: ''
})
const checkAll = ref(false)
const isIndeterminate = ref(true)
var checkedCities = ref(['是'])
var cities = ['是', '否']
//事件
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === cities.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
const change = () => {//判断是否在库
    console.log(checkedCities)
    if (checkedCities.value.length == 0 || checkedCities.value.length == 2) {
        ElMessageBox.alert('错误操作|只能单选', '提示：', {
            confirmButtonText: '确认',
        })
    }
}
const datePack = () => {//打包数据
    formInline.value.checkStatus = checkedCities.value[0];
}
const statusPack = () => {//状态函数
    change();
    datePack();
}

//通信区域
//接受请求

//发送请求
const nameGet = () => {//设备名称
    axios.get('/users')
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error)
        })
}
const styleGet = () => {//设备型号
    axios({
        url: '/EquipmentSubmit',
        data: formInline.modelName,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        console.log(res)
    })
}
const onSubmit = () => {//提交
    statusPack()
    // axios({
    //     url: '/EquipmentSubmit',
    //     data: formInline,
    //     method: 'post',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // }).then(res => {
    //     console.log(res)
    // })
}
</script>
  
<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}
</style>
  