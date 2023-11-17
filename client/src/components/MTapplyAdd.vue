<template>
    <div class="common-layout" style="height: 100%;">
        <el-container style="height: 100%;">
            <el-header style="background-color: #f6f8f8; display: flex; align-items: center; ">
                <el-text class="mx-1" size="large">设备信息</el-text>
            </el-header>
            <el-main style="background-color: #ffffff;">
                <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
                    <el-form class="demo-form-inline" :label-position="labelPosition" label-width="120px"
                        style="max-width: 460px;width: 60%;">
                        <el-form-item label="样机申请方：">
                            <el-input style="width: 100%;" v-model="formInline.modelApplyName" placeholder="样机申请方" clearable />
                        </el-form-item>
                        <el-form-item label="样机使用用户：">
                            <el-input style="width: 100%;" v-model="formInline.modelUsedName" placeholder="样机使用用户" clearable />
                        </el-form-item>
                        <el-form-item label="样机用途：">
                            <el-select style="width: 100%;" v-model="formInline.modelUsedFunction" placeholder="样机用途"
                                clearable>
                                <el-option v-for="Function in equipmentFunctions" :key="Function" :label="Function"
                                    :value="Function" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择设备名称：">
                            <el-select style="width: 100%;" v-model="formInline.modelName" placeholder="设备名称" clearable>
                                <el-option v-for="Name in equipmentNames" :key="Name" :label="Name" :value="Name" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="模块选择：">
                            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                                @change="handleCheckAllChange">全选</el-checkbox>
                            <el-checkbox-group v-model="modelModule" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                                    city
                                }}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="期望到货时间">
                            <el-date-picker v-model="formInline.modelArrivelTime" type="datetime" placeholder="选择期望到货时间"
                                :default-time="defaultTime" />
                        </el-form-item>
                        <el-form-item label="期望到货地址">
                            <el-input style="width: 100%;" v-model="formInline.modelArriveLocation" placeholder="期望到货地址"
                                clearable />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="eamilSubmit">确认保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from "axios";
import ButtonUpload from '@/components/ButtonUpload.vue'
import type { FormProps } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import dayjs from 'dayjs'
//数据
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const value3 = ref('')

const labelPosition = ref<FormProps['labelPosition']>('right')
const uploadRef = ref<UploadInstance>()
var uploadData = new FormData()
var modelModule = ref(['实物训练', '基础技能训练'])
var cities = ['实物训练', '基础技能训练', '缝合打结训练', '胆囊手术训练']
var equipmentFunctions = ['招标前演示', '样机试用']
var equipmentNames = ['力反馈腹腔镜', '虚实结合腹腔镜']
const formInline = ref({
    modelApplyName: '',
    modelUsedName: '',
    modelUsedFunction: '',
    modelName: '',
    modelArrivelTime: '',
    modelArriveLocation: '',
    modelModule: [''],

})
const checkAll = ref(false)
const isIndeterminate = ref(true)

//事件
const handleCheckAllChange = (val: boolean) => {
    modelModule.value = val ? cities : []
    isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === cities.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    const file = uploadFile.raw as File;
    uploadData.append('file', file)
}

//    const dayTime =  dayjs(formInline.value.arrivalTime).format("YYYY-MM-DD HH-mm-ss")


//通信
const getModule = () => {//模块|用途|设备名称
    //多选框
    modelModule.value = ['实物训练', '基础技能训练']
    cities = ['实物训练', '基础技能训练', '缝合打结训练', '胆囊手术训练']
    equipmentFunctions = ['招标前演示', '样机试用']
    equipmentNames = ['力反馈腹腔镜', '虚实结合腹腔镜']
}

const eamilSubmit = () => {//发送请求
    formInline.value.modelModule = modelModule.value;
    console.log(formInline)
        axios({
          url: '/Model/ModelApply',
          data: formInline.value,
          method: 'post',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      }).then(res => {
          console.log(res)
      })
}
</script>
  
<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}
.demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
  