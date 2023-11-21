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
          <AddEvent />
        </el-dialog>
        <el-date-picker style="margin-left: 20px;" v-model="startDate" type="date" placeholder="选择起始日期">
        </el-date-picker>
        <el-date-picker style="margin-left: 20px;" v-model="endDate" type="date" placeholder="选择结束日期">
        </el-date-picker>
        <el-button style="float: right;margin: 20px;" type="primary" icon="el-icon-download"
          @click="onSubmit">数据查询</el-button>
      </div>
    </div>
    <!--Excel表格导出-->
    <el-table :data="tableData" style="width: 100%">
      <!-- 表格列定义 -->
      <!-- <el-table-column prop="name" label="序号"></el-table-column> -->
      <el-table-column prop="event" label="事件"></el-table-column>
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column prop="money" label="费用"></el-table-column>
    </el-table>
  </div>
</template>
    
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";
import axios from "axios";
import { CirclePlus } from "@element-plus/icons-vue";
import AddEvent from "./ShipEvent.vue"
// 定义数据
const startDate = ref(new Date());
const endDate = ref(new Date());
var dialogFormVisible = ref(false)


const tableData = ref([]);
const filterData = () => {
  // 在这里根据关键字、下拉框选项、起始日期和结束日期对数据进行筛选
  // 筛选后的数据存储在tableData中，表格会自动更新显示筛选后的数据
};

var searchData = new FormData();
//查询条件
const onSubmit = () => {
  const searchData = { startDate: startDate.value, endDate: endDate.value }
  const data  = [{'event':'上传文件','date':'1997-10-16','money':'15'}]
}

//事件
const EventAdd = () => {
  dialogFormVisible.value = true
}

</script>
