<template>
    <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
        <el-form class="demo-form-inline" :label-position="labelPosition" label-width="120px"
            style="max-width: 460px;width: 40%;">
            <el-form-item label="用户/样机名称">
                <el-input style="width: 100%;" v-model="formInline.clientName" placeholder="用户名称" clearable />
            </el-form-item>
            <el-form-item label="设备名称">
                <el-select style="width: 100%;" v-model="formInline.equipmentName" placeholder="设备名称" clearable>
                    <el-option v-for="item in equipmentNames" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="设备编号">
                <el-input style="width: 100%;" v-model="formInline.equipmentId" placeholder="设备编号" clearable />
            </el-form-item>
            <el-form-item label="故障时间">
                <el-date-picker style="width: 100%;" v-model="formInline.faultDate" type="date" placeholder="选择故障日期"
                    clearable />
            </el-form-item>
            <el-form-item label="故障现象描述">
                <el-input style="width: 100%;" v-model="formInline.faultPhenomenon" placeholder="描述故障现象" clearable />
            </el-form-item>
            <el-form-item label="故障图片上传">
                <!-- <ButtonUpload :buttonText="'上传图片/视频'" /> -->
                <el-upload type="file" ref="uploadRef" class="upload-demo" :auto-upload="false" clearable
                    :on-change="handleChange">
                    <template #trigger>
                        <el-button type="primary">上传图片/视频</el-button>
                    </template>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item label="备注">
                <el-input style="width: 100%;" v-model="formInline.notes" placeholder="输入其他备注信息" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认保存</el-button>
            </el-form-item>
        </el-form>
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
import * as components from '../constants.json'
import axiosServer from '../assets/common/axios-server'

const equipmentNames = components.selectEquipmentName
const labelPosition = ref<FormProps['labelPosition']>('right')
const formInline = reactive({//这里就是获取的数据
    clientName: '',
    equipmentName: '',
    equipmentId: '',
    faultDate: '',
    faultPhenomenon: '',
    notes: ''
})

const uploadRef = ref<UploadInstance>()
var uploadData = new FormData()
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    const file = uploadFile.raw as File;
    uploadData.append('file', file)
}

const onSubmit = async() => {
    //除上传图片，其他为空，则弹框，不请求
    if(formInline.clientName==''||formInline.equipmentName==''||formInline.equipmentId==''||formInline.faultDate==''||formInline.faultPhenomenon==''||formInline.notes==''){
        ElMessageBox.alert('输入不能为空', '提示：', {
                    confirmButtonText: '确认',
                })
        return;
    }
    const checkresult =  await axiosServer.AxiosPost(formInline, '/Equipment/CheckAndRetrieveQualityDate')
    console.log('checkresult',checkresult)
    if(checkresult.success == false){
        ElMessage.error('添加失败，该设备并未中标！');
        return 
    }
    uploadData.append('clientName',formInline.clientName)
    uploadData.append('equipmentName',formInline.equipmentName)
    uploadData.append('equipmentId',formInline.equipmentId)
    uploadData.append('faultDate',formInline.faultDate)
    uploadData.append('faultPhenomenon',formInline.faultPhenomenon)
    uploadData.append('notes',formInline.notes)
    uploadData.append('qualityDate',checkresult.result.protectTime)
    uploadData.append('signforDate',checkresult.result.signforDate)
    console.log('uploadData',uploadData)
    axios(
        {
            url: '/Equipment/EquipmentSubmit',
            data: uploadData,
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            console.log(res.data)
            if (res.status == 200) {//确认保存后，即使清空
                ElMessageBox.alert('保存成功', '提示：', {
                    confirmButtonText: '确认',
                })
                uploadRef.value!.clearFiles();
                uploadData = new FormData()
                for (const key in formInline) {
                    (formInline as any)[key] = '';

                }
            }

        })
}
</script>
  
<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}
</style>
  