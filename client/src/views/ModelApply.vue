<template>
    <div style="display: flex; justify-content: center; align-items: center;  height: 100%;width: 100%;">
        <el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"
            style="max-width: 460px;width: 100%;">
            <el-form-item label="样机申请方">
                <el-input style="width: 100%;" v-model="formInline.clientName" placeholder="用户名称" clearable />
            </el-form-item>
            <el-form-item label="样机使用用户">
                <el-input style="width: 100%;" v-model="formInline.clientName" placeholder="用户名称" clearable />
            </el-form-item>
            <el-form-item label="样机用途">
                <el-select style="width: 100%;" v-model="formInline.equipmentName" placeholder="设备名称" clearable>
                    <el-option label="已中标" value="已中标" />
                    <el-option label="未中标" value="未中标" />
                </el-select> </el-form-item>
            <el-form-item label="选择设备名称">
                <el-select style="width: 100%;" v-model="formInline.equipmentName" placeholder="设备名称" clearable>
                    <el-option label="已中标" value="已中标" />
                    <el-option label="未中标" value="未中标" />
                </el-select>
            </el-form-item>
            <el-form-item label="模块信息">
                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                        city
                    }}</el-checkbox>
                </el-checkbox-group>


            </el-form-item>
            <el-form-item label="期望到货时间">
                <el-date-picker style="width: 100%;" v-model="formInline.faultDate" type="date" placeholder="Pick a date"
                    clearable />
            </el-form-item>
            <el-form-item label="期望收货地址">
                <el-input style="width: 100%;" v-model="formInline.notes" placeholder="用户名称" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交申请</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from "axios";
import ButtonUpload from '@/components/ButtonUpload.vue'
import type { FormProps } from 'element-plus'
const labelPosition = ref<FormProps['labelPosition']>('right')


const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['实物训练', '基础技能训练'])
const cities = ['实物训练', '基础技能训练', '缝合打结训练', '胆囊手术训练']

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}


const formInline = reactive({//这里就是获取的数据
    clientName: '',
    equipmentName: '',
    equipmentId: '',
    faultDate: '',
    faultPhenomenon: '',
    notes: ''
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
</style>
  