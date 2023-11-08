<template>
    <el-form :inline="false" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
            <el-input v-model="formInline.user" placeholder="用户名称" clearable />
        </el-form-item>
        <el-form-item label="订单状态">
            <el-select v-model="formInline.region" placeholder="订单状态" clearable>
                <el-option label="已中标" value="已中标" />
                <el-option label="未中标" value="未中标" />
            </el-select>
        </el-form-item>
        <el-form-item label="中标时间">
            <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认保存</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'
import axios from "axios";

const formInline = reactive({//这里就是获取的数据
    user: '',
    region: '',
    date: '',
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
            url: '/users',
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
  