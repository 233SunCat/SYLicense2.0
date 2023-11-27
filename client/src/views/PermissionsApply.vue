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
        <el-col :span="15">
        </el-col>
        <el-col :span="2">
          <el-button style="text-align: right" type="primary" icon="el-icon-download" @click="dataSearch">数据查</el-button>
        </el-col>
      </el-row>
      <!--Excel表格导出-->>
      <el-table :data="tableData" style="width: 100%">
        <!-- 表格列定义 -->
        <!-- <el-table-column prop="name" label="序号"></el-table-column> -->
        <el-table-column prop="equipmentName" label="微信ID"></el-table-column>
        <el-table-column prop="equipmentId" label="昵称"></el-table-column>
        <el-table-column prop="clientName" label="姓名"></el-table-column>
        <el-table-column prop="qualityDate" label="申请时间"></el-table-column>
        <el-table-column prop="qualityDate" label="账号状态"></el-table-column>
        <el-table-column prop="operation" label="操作">
          <template>
            <el-button type="primary" text @click="dialogFormVisible = true">权限分配</el-button>
            <!-- Form -->
            <el-dialog v-model="dialogFormVisible" title="维修记录">
              <el-form :model="form" :inline="false" class="demo-form-inline" :label-position="labelPosition"
                label-width="120px">
                <el-form-item label="维修人员：" :label-width="formLabelWidth">
                  <el-input v-model="form.repairEngineer" autocomplete="off" class="dialog-inputs" />
                </el-form-item>
                <el-form-item label="维修时间：" :label-width="formLabelWidth">
                  <el-date-picker v-model="form.repairTime" type="date" placeholder="选择维修时间" class="dialog-inputs">
                  </el-date-picker> </el-form-item>
                <el-form-item label="维修地点：" :label-width="formLabelWidth">
                  <el-input v-model="form.repairLocation" autocomplete="off" class="dialog-inputs" />
                </el-form-item>
                <el-form-item label="维修方式：">
                  <el-checkbox v-model="form.checked1" label="现场维修" />
                  <el-checkbox v-model="form.checked2" label="无法维修，设备返厂" />
                </el-form-item>
                <el-form-item label="维修成本：" :label-width="formLabelWidth">
                  <el-input v-model="form.repairMoney" autocomplete="off" class="dialog-inputs" />
                </el-form-item>
                <el-form-item label="维修内容：" :label-width="formLabelWidth">
                  <el-input v-model="form.repairContext" autocomplete="off" class="dialog-inputs" />
                </el-form-item>
                <el-form-item label="维修备注：" :label-width="formLabelWidth">
                  <el-input v-model="form.repairNotes" autocomplete="off" />
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="PermissionsSubmit">
                    确认提交
                  </el-button>
                </span>
              </template>
            </el-dialog>
          </template>
        </el-table-column>
        <!-- 其他表格列... -->
      </el-table>
    </div>
  </template>
      
  <script lang="ts" setup>
  import { ref, reactive } from "vue";
  import { Search } from "@element-plus/icons-vue";
  import { ElButton, FormProps} from "element-plus";
  import XLSX from "xlsx";
  import { useRouter } from "vue-router";
  import axios from "axios";
  import { ElMessage, ElMessageBox } from 'element-plus'

const labelPosition = ref<FormProps["labelPosition"]>("right");

//权限分配
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  repairEngineer: '',
  repairTime: '',
  repairLocation: '',
  repairMoney: '',
  repairContext: '',
  repairNotes: '',
  checked1: false,
  checked2: false
})
const PermissionsSubmit = () =>{
    axios({
    url: "/Equipment/EquipmentDetail/RepairSubmit",
    data: form,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => {
    if (res.status == 200) {
      //确认保存后，即使清空
      console.log(res.data)
      ElMessageBox.alert('保存成功', '提示：', {
                    confirmButtonText: '确认',
                })
    }
  });
}
  // 定义数据
  const keyword = ref("");
  const selectedOption = ref("");
  const startDate = ref(new Date());
  const endDate = ref(new Date());
  const options = ref([
    { label: "待维修", value: "待维修" },
    { label: "已维修", value: "已维修" },
    // 其他选项...
  ]);
  
  const tableData = ref([]);
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
          return item;
        });
      }
    });
  }

  </script>
  