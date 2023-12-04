<template>
  <div style="width: 100%">
    <!-- 检索条件一排显示 -->
    <el-row :gutter="20" style="width: 100%">
      <el-col :span="3">
        <el-input :suffix-icon="Search" v-model="keyword" placeholder="关键字搜索"></el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="selectedOption" placeholder="下拉框条件选择" style="width: 200px;">
          <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1"> </el-col>
      <el-col :span="3">
        <el-date-picker v-model="startDate" type="date" placeholder="选择起始日期">
        </el-date-picker>
      </el-col>
      <el-col :span="1"> </el-col>
      <el-col :span="3">
        <el-date-picker v-model="endDate" type="date" placeholder="选择结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
      </el-col>
      <el-col :span="2">
        <el-button style="text-align: right" type="primary" icon="el-icon-download" @click="dataSearch">数据查询</el-button>
      </el-col>
      <el-col :span="3">
        <el-button style="text-align: right" type="primary" icon="el-icon-download"
          @click="exportToExcel">数据导出</el-button>
      </el-col>
    </el-row>
    <!--Excel表格导出-->>
    <el-table :data="tableData" style="width: 100%">
      <!-- 表格列定义 -->
      <!-- <el-table-column prop="name" label="序号"></el-table-column> -->
      <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
      <el-table-column prop="equipmentId" label="设备编号"></el-table-column>
      <el-table-column prop="clientName" label="用户/样机名称"></el-table-column>
      <el-table-column prop="protectTime" label="质保期"></el-table-column>
      <el-table-column prop="signforDate" label="签收时间"></el-table-column>
      <el-table-column prop="protectTimeLast" label="质保剩余时间"></el-table-column>
      <el-table-column prop="faultDate" label="故障时间"></el-table-column>
      <el-table-column prop="faultPhenomenon" label="故障现象"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template #default="scope">
          <el-button type="success" plain @click="handleRowClick(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
      <!-- 其他表格列... -->
    </el-table>
  </div>
</template>
    
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";
import XLSX from "xlsx";
import { useRouter } from "vue-router";
import axios from "axios";
import dayjs from 'dayjs'


// 定义数据
const keyword = ref("");
const selectedOption = ref("");
const startDate = ref(new Date());
startDate.value.setMonth(startDate.value.getMonth() - 1);
const endDate = ref(new Date());
const options = ref([
  { label: "待维修", value: "待维修" },
  { label: "已维修", value: "已维修" },
  // 其他选项...
]);

const tableData = ref([]);
const filterData = () => {
  // 在这里根据关键字、下拉框选项、起始日期和结束日期对数据进行筛选
  // 筛选后的数据存储在tableData中，表格会自动更新显示筛选后的数据
};

var searchData = new FormData();
//查询条件
const dataSearch = () => {
  const searchData = { keyword: keyword.value, selectedOption: selectedOption.value, startDate: startDate.value, endDate: endDate.value }
  axios({
    url: "/Equipment/EquipmentSearch",
    data: searchData,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    if (res.status == 200) {
      //确认保存后，即使清空
      tableData.value = res.data.map(item => {
        item.faultDate = new Date(item.faultDate).toLocaleDateString();
        // 假设 protectTime 和 signforDate 都是日期对象
        var signforDate = new Date(item.signforDate);
        // 计算质保剩余时间
        const currentTime = new Date(); // 现在的时间
        const timeDifference = currentTime.getTime() - signforDate.getTime();
        // 将剩余时间转换为天数（或其他你需要的时间单位）
        const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        item.signforDate = new Date(item.signforDate).toLocaleDateString();
        // 将结果赋值给 protectTimeLast
        item.protectTimeLast = item.protectTime - remainingDays;
        return item;
      });
    }
  });
}

// 导出Excel的方法
const exportToExcel = () => {
  // 在这里编写导出Excel的逻辑
  const data = [
    { name: "John Doe", age: 25, email: "john@example.com" },
    { name: "Jane Smith", age: 30, email: "jane@example.com" },
  ];
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = { Sheets: { Sheet1: worksheet }, SheetNames: ["Sheet1"] };
  XLSX.writeFile(workbook, "exported_data.xlsx");
};

const router = useRouter();
var uploadData = new FormData()
//表格跳转
const handleRowClick = (row: any) => {
  // 处理按钮点击事件，跳转到其他页面
  console.log("输出跳转页面事件");
  uploadData.append('equipmentId', row.equipmentId)
  //点击的向服务端发送请求拿到数据之后跳转
  axios({
    url: "/Equipment/EquipmentDetail",
    data: { equipmentId: row.equipmentId },
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    console.log('跳转res', res)
    if (res.status != 500 && res.data) {
      const data = res.data[0];
      router.push({
        path: '/Equipment/EquipmentDetail',
        query: {
          faultDate: data.faultDate, faultPhenomenon: data.faultPhenomenon, notes: data.notes, equipmentId: row.equipmentId,
          clientName: row.clientName, protectTime: row.protectTime, equipmentName: row.equipmentName,
          status: row.status, signforDate: row.signforDate,
          imageVideo: data.imageVideo
        }
        // 多个参数这样的写法
        // query:{Shuju}
      })
    }
  });
};
// 暴露给模板的变量和方法
const expose = {
  exportToExcel,
};
</script>
