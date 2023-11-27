<template>
  <div style="width: 100%">
    <!-- 检索条件一排显示 -->
    <div style="width: 100%">
      <!-- 检索条件一排显示 -->
      <div style="width: 100%;">
        <el-button style="width: 10%;margin: 20px;" :suffix-icon="Search" @click="EventAdd">
          <el-icon>
            <CirclePlus />
          </el-icon>
          新增事件
        </el-button>
        <el-dialog v-model="dialogFormVisible" title="维修记录">
          <el-form class="demo-form-inline" :label-position="labelPosition" label-width="100px"
            style="max-width: 460px;width: 40%;">
            <el-form-item label="选择时间">
              <el-date-picker style="width: 100%;" v-model="formInline.eventDate" type="date" placeholder="请选择时间"
                clearable />
            </el-form-item>
            <el-form-item label="事件描述">
              <el-input type="textarea" style="width: 100%;" v-model="formInline.eventDescription" placeholder="请填写事件描述"
                clearable />
            </el-form-item>
            <el-form-item label="费用估算/元">
              <el-input style="width: 100%;" v-model="formInline.eventUsedMoney" placeholder="请填写估算值" clearable />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">确认提交</el-button>
              <el-button type="primary" @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-date-picker style="margin-left: 20px;" v-model="startDate" type="date" placeholder="选择起始日期">
        </el-date-picker>
        <el-date-picker style="margin-left: 20px;" v-model="endDate" type="date" placeholder="选择结束日期">
        </el-date-picker>
        <el-button style="float: right;margin: 20px;" type="primary" icon="el-icon-download"
          @click="dataSearch">数据查询</el-button>
      </div>
    </div>
    <!--Excel表格导出-->
    <el-table :data="tableData" style="width: 100%">
      <!-- 表格列定义 -->
      <!-- <el-table-column prop="name" label="序号"></el-table-column> -->
      <el-table-column prop="eventDescription" label="事件"></el-table-column>
      <el-table-column prop="eventDate" label="时间"></el-table-column>
      <el-table-column prop="eventUsedMoney" label="费用"></el-table-column>
    </el-table>
  </div>
</template>
    
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";
import { CirclePlus } from "@element-plus/icons-vue";
import AddEvent from "./AddEvent.vue"
import axiosServer from '../assets/common/axios-server'
import qs from 'qs'; // 引入 qs 库
import EventBus from "../assets/common/event-bus"
import funBox from '../assets/common/fun-box'
import messageBox from '../assets/common/message-box'
// 定义数据
const startDate = ref(new Date());
const endDate = ref(new Date());
var dialogFormVisible = ref(false)
var parentMessage = {};


const tableData = ref([]);
const filterData = () => {
  // 在这里根据关键字、下拉框选项、起始日期和结束日期对数据进行筛选
  // 筛选后的数据存储在tableData中，表格会自动更新显示筛选后的数据
};
var orderDate = null
var clientName = ''
var searchData = new FormData();
//查询条件
const dataSearch = () => {
  const val = { startDate: startDate.value, endDate: endDate.value, clientName: clientName, orderDate: orderDate }
  console.log('val',val)
  axiosServer.AxiosPost(val, '/ShipClient/GetShipEvent').then(res => {
    tableData.value = res.map(item => {
      item.eventDate = new Date(item.eventDate).toLocaleString('zh-CN', {
        hour12: false
      });
      return item;
    });
  })
}

//数据
const formInline = reactive({//这里就是获取的数据
  eventDate: Date(),
  eventDescription: '',
  eventUsedMoney: '',
})
//事件


const onCancel = () => {
  dialogFormVisible.value = false
}

//发送请求

var orderDate = null
var clientName = ''

const onSubmit = () => {//提交
  const formInlineFields = Object.keys(formInline);
  if (funBox.checkRequiredFields(formInline, formInlineFields)) { return }
  formInline.orderDate = orderDate
  formInline.clientName = clientName
  console.log('ffffffffff')
  axiosServer.AxiosPost(qs.stringify(formInline), '/ShipClient/AddShipEvent').then(res => {
    console.log('resres',res)
    if (res.success == true) {
      messageBox.MessageBox('保存成功')
      dialogFormVisible.value = false
    } else {
      messageBox.MessageBox('保存失败')
      dialogFormVisible.value = false
    }
  })
}


//事件
const EventAdd = () => {
  dialogFormVisible.value = true
  parentMessage = { clientName: clientName, orderDate: orderDate }
  //EventBus.emit("slide-ship-event", { clientName: clientName, orderDate: orderDate});
}
EventBus.on('slide-ship-order', async (val: any) => {
  orderDate = val.orderDate
  clientName = val.clientName
})
</script>
