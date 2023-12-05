<template>
    <div class="common-layout" style="height: 50%">
        <el-container style="height: 100%">
            <el-header style="background-color: #f6f8f8; display: flex; align-items: center">
                <el-text class="mx-1" size="large">收货信息</el-text>
            </el-header>
            <el-main style="background-color: #ffffff">
                <div style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100%;
                            width: 100%;
                          ">
                    <div style="display: flex; justify-content: center; align-items: center;  height: 50%;width: 100%;">
                        <el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"
                            style="max-width: 660px;width: 50%;">
                            <el-form-item label="用户名称">
                                <el-input style="width: 100%;" v-model="formInline.clientName" placeholder="终端用户全称"
                                    clearable />
                            </el-form-item>
                            <el-form-item label="订单状态">
                                <el-select style="width: 100%;" v-model="formInline.orderStatus" placeholder="订单状态"
                                    clearable>
                                    <el-option v-for="item in items" :key="item" :label="item" :value="item" />
                                </el-select> </el-form-item>
                            <el-form-item label="归属地">
                                <el-select v-model="formInline.clientArea" placeholder="选择区" clearable
                                    @change="onAreaChange">
                                    <el-option v-for="area in areas" :key="area" :label="area" :value="area" />
                                </el-select>

                                <el-select v-model="formInline.clientProvince" placeholder="选择省" clearable
                                    @change="onProvinceChange">
                                    <el-option v-for="province in provinces" :key="province" :label="province"
                                        :value="province" />
                                </el-select>

                                <el-select v-model="formInline.clientUrban" placeholder="选择市" clearable>
                                    <el-option v-for="urban in urbans" :key="urban" :label="urban" :value="urban" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="医院等级">
                                <el-input style="width: 100%;" v-model="formInline.clientLevel" placeholder="请填写终端医院等级"
                                    clearable />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">确认</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
  
<script lang="ts" setup>
//模块
import { ref, reactive, onMounted } from 'vue'
import EventBus from "../assets/common/event-bus"
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import * as constants from '../constants.json';
import messageBox from '../assets/common/message-box'
import funBox from '../assets/common/fun-box'

//数据
const formInline = reactive({
    clientName: '',
    orderStatus: '',
    clientArea: '',
    clientProvince: '',
    clientUrban: '',
    clientLevel: ''
})
const areas = ref(Object.keys(constants.City));
const provinces = ref([]);
const urbans = ref([]);
const onAreaChange = () => {
    const allProvinces = constants.City[formInline.clientArea] ? Object.keys(constants.City[formInline.clientArea]) : undefined;
    provinces.value = allProvinces
    formInline.clientProvince = "";
    formInline.clientUrban = "";
};
const getCityArray = (areaInfo: Record<string, Record<string, string[]>>, area: string, city: string): string[] | undefined => {
    const areaData = areaInfo[area];
    return areaData && areaData[city] ? areaData[city] : undefined;
};
const onProvinceChange = () => {
    const cityArray = getCityArray(constants.City, formInline.clientArea, formInline.clientProvince);
    urbans.value = cityArray
    formInline.clientUrban = "";
};
// 初始化
onMounted(() => {
    areas.value = Object.keys(constants.City);
});
var orderDate = null
var clientName = ''
const formInlineCopy = formInline
/**
 * 添加
 */
const onSubmit = () => {
    const formInlineFields = Object.keys(formInline);
    console.log('formInline', formInline, 'formInlineFields', formInlineFields)
    if (funBox.checkRequiredFields(formInline, formInlineFields)) { return }
    formInline.orderDate = orderDate
    formInline.clientName = clientName
    axiosServer.AxiosPost(qs.stringify(formInline), '/ShipClient/AddShipUserStatus').then(res => {
        if (res.success == true) {
            messageBox.MessageBox('保存成功')
        } else {
            messageBox.MessageBox('保存失败')
        }
    })
};
/**
 * 加载
 */
 const handerBus = async (val: any) => {
    orderDate = val.orderDate
    clientName = val.clientName
    EventBus.off('slide-ship-order', handerBus)

    axiosServer.AxiosPost(val, '/ShipClient/GetShipUserStatus').then(res => {//res = [],如果id存在[{}...]，id不存在[]
        Object.assign(formInline, funBox.FormDisplay(res,formInline,formInlineCopy));
    })
}
EventBus.on('slide-ship-order', handerBus)

</script>
  
<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}
</style>
  