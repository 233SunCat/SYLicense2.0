<template>
    <div style="width: 100%;">
      <!-- 检索条件一排显示 -->
      <el-row :gutter="20" style="width: 100%;">
        <el-col :span="3">
          <el-input :suffix-icon="Search" v-model="keyword" placeholder="关键字搜索"></el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="selectedOption" placeholder="下拉框条件选择">
            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="startDate" type="date" placeholder="选择起始日期">
          </el-date-picker>
        </el-col>
        <el-col :span="1">
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="endDate" type="date" placeholder="选择结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="8">
        </el-col>
        <el-col :span="3">
          <el-button style="text-align: right;" type="primary" icon="el-icon-download"
            @click="exportToExcel">数据导出</el-button>
        </el-col>
      </el-row>
      <!--Excel表格导出-->>
  
      <el-table :data="tableData" style="width: 100%;" >
        <!-- 表格列定义 -->
        <el-table-column  prop="name" label="序号"></el-table-column>
        <el-table-column  prop="equipmentName" label="设备名称"></el-table-column>
        <el-table-column  prop="equipmentId" label="设备编号"></el-table-column>
        <el-table-column  prop="clientName" label="用户/样机名称"></el-table-column>
        <el-table-column  prop="qualityDate" label="质保期"></el-table-column>
        <el-table-column  prop="qualityDate" label="质保剩余时间"></el-table-column>
        <el-table-column  prop="faultDate" label="故障时间"></el-table-column>
        <el-table-column  prop="faultPhenomenon" label="故障现象"></el-table-column>
        <el-table-column  prop="status" label="状态"></el-table-column>
        <el-table-column  prop="operation" label="操作">
          <template #default="scope">
            <!-- 按钮，点击后跳转到其他页面 -->
            <router-link style="  text-decoration: none;" to="/Equipment/EquipmentDetail"><el-button type="success" plain @click="handleRowClick(scope.row)">查看详情</el-button></router-link>
          </template>
        </el-table-column>
        <!-- 其他表格列... -->
      </el-table>
    </div>

  </template>
    
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { Search } from '@element-plus/icons-vue'
  import { ElButton } from 'element-plus';
  import XLSX from 'xlsx';
  import { useRouter } from 'vue-router'; 
  import axios from "axios";
 
  window.onerror = function(message, source, lineno, colno, error) {
    if(message =='ResizeObserver loop completed with undelivered notifications.'){
        console.log("处理时间出发")
        return true;
    }
    // do something
}

// or

// window.addEventListener('error', function(event) { 
//   //console.log(event)
//   // do something
// })
  

  // 定义数据  
  const keyword = ref('');
  const selectedOption = ref('');
  const startDate = ref('');
  const endDate = ref('');
  const options = ref([
    { label: '条件1', value: 'option1' },
    { label: '条件2', value: 'option2' },
    // 其他选项...  
  ]);
  
  // axios.get('/')
  //     .then(response => {
  //         console.log(response)
  //     })
  //     .catch(error => {
  //         console.error(error)
  //     })
  
  // 根据搜索条件进行筛选的方法  
  const filterData = () => {
    // 在这里根据关键字、下拉框选项、起始日期和结束日期对数据进行筛选  
    // 筛选后的数据存储在tableData中，表格会自动更新显示筛选后的数据  
  };
  
  // 导出Excel的方法  
  const exportToExcel = () => {
    // 在这里编写导出Excel的逻辑  
    const data = [
      { name: 'John Doe', age: 25, email: 'john@example.com' },
      { name: 'Jane Smith', age: 30, email: 'jane@example.com' },
    ];
  
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    XLSX.writeFile(workbook, 'exported_data.xlsx');
  };

  var searchData = new FormData()
  const tableData = ref([]);
  axios(
        {
            url: '/Equipment/EquipmentSearch',
            data: searchData,
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            console.log(res.data)
            if (res.status == 200) {//确认保存后，即使清空
                tableData.value = res.data;
            }

        })
  const router = useRouter();  
  //表格跳转
  const handleRowClick = (row: any) => {  
    // 处理按钮点击事件，跳转到其他页面  
    // 使用 Vue Router 的 push 方法进行页面跳转  
    //router.push('/EquipmentDetail'); // 替换 '/other-page' 为你需要跳转的页面的路由路径  
  };  



  // 暴露给模板的变量和方法  
  const expose = {
    exportToExcel,
  };
  
  //watch([keyword, selectedOption, startDate, endDate], filterData, { immediate: true });  
  </script>