<template>
    <div  style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
    <el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"  style="max-width: 460px;width: 40%;">
        <el-form-item label="设备名称">
            <el-select style="width: 100%;" v-model="formInline.equipmentName" placeholder="设备名称" clearable>
                <el-option label="已中标" value="已中标" />
                <el-option label="未中标" value="未中标" />
            </el-select>        </el-form-item>
        <el-form-item label="设备型号">
            <el-select style="width: 100%;" v-model="formInline.equipmentName" placeholder="设备名称" clearable>
                <el-option label="已中标" value="已中标" />
                <el-option label="未中标" value="未中标" />
            </el-select>
        </el-form-item>
        <el-form-item label="生产日期">
            <el-date-picker style="width: 100%;" v-model="formInline.faultDate" type="date" placeholder="选择生产日期" clearable />
        </el-form-item>
        <el-form-item label="设备编号">
            <el-input style="width: 100%;" v-model="formInline.faultPhenomenon" placeholder="输入设备编号" clearable />
        </el-form-item>

        <el-form-item label="软件版本">
            <el-input style="width: 100%;" v-model="formInline.notes" placeholder="输入软件版本" clearable />
        </el-form-item>
        <el-form-item label="是否在库">
            <el-checkbox v-model="checked1" label="是" />
            <el-checkbox v-model="checked1" label="否" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import { ref,reactive } from 'vue'
import axios from "axios";
import ButtonUpload from '@/components/ButtonUpload.vue'
import type { FormProps } from 'element-plus'
const labelPosition = ref<FormProps['labelPosition']>('right')

const checked1 = ref(false)
const formInline = reactive({//这里就是获取的数据
    clientName: '',
    equipmentName:'',
    equipmentId: '',
    faultDate: '',
    faultPhenomenon:'',
    notes:''
})

const onSubmit = () => {
    console.log('submit!')
    // axios.get('/users')
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         console.error(error)
    //     })
    axios({
            url: '/EquipmentSubmit',
            data: formInline,
            method: 'post',
            headers: {
                  'Content-Type':'application/x-www-form-urlencoded'
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
</style>
  