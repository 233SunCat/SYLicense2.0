<template style="height:100%;">
  <div style="height: 100%; width: 100%">
    <div style="display: flex; justify-content: center">
      <el-text class="mx-1" style="font-size: 20px">力反馈腹腔镜</el-text>
      <el-tag style="margin: 10px">在保</el-tag>
      <br />
      <el-tag style="margin: 10px" class="ml-2" type="warning">已维修</el-tag>
    </div>
    <div style="height: 8%; display: flex; justify-content: center">
      <el-tag class="ml-2" type="info">用户-苏州人民医院</el-tag>
      <el-tag class="ml-2" type="info">设备编号- TTS</el-tag>
      <el-tag class="ml-2" type="info">质保期- 3年</el-tag>
      <el-tag class="ml-2" type="info">剩余质保期- 1年</el-tag>
    </div>
    <div>
      <div style="display: flex; justify-content: center">
        <el-text class="mx-1" style="font-size: 20px">故障详情</el-text>
      </div>
      <div style="display: flex; justify-content: center">
        <el-form :inline="false" class="demo-form-inline" :label-position="labelPosition" label-width="120px">
          <el-form-item label="故障时间">
            <el-input v-model="inputDate" disabled clearable>初始值</el-input>
          </el-form-item>
          <el-form-item label="故障现象描述">
            <el-input v-model="inputPhenomenon" disabled clearable>初始值</el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="inputNotes" disabled clearable>初始值</el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" text @click="dialogFormVisible = true">填写维修记录</el-button>
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
                  <el-button type="primary" @click="RepairSubmit">
                    确认提交
                  </el-button>
                </span>
              </template>
            </el-dialog>
            <!-- Form -->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="width: 100%">
      <el-row :gutter="20" style="width: 100%">
        <el-col :span="3">
          <el-date-picker v-model="startDate" type="date" placeholder="选择起始日期">
          </el-date-picker>
        </el-col>
        <el-col :span="1"> </el-col>
        <el-col :span="3">
          <el-date-picker v-model="endDate" type="date" placeholder="选择结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="2">
          <el-button style="text-align: right" type="primary" icon="el-icon-download" @click="dataSearch">数据查询</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData">
        <el-table-column prop="name" label="序号"></el-table-column>
        <el-table-column prop="deviceName" label="状态"></el-table-column>
        <el-table-column prop="faultDate" label="故障时间"></el-table-column>
        <el-table-column prop="failurePhenomenon" label="故障现象"></el-table-column>
        <el-table-column prop="warrantyPeriod" label="故障图片"></el-table-column>
        <el-table-column prop="remainingWarranty" label="维修人"></el-table-column>
        <el-table-column prop="failureTime" label="维修时间"></el-table-column>
        <el-table-column prop="failurePhenomenon" label="维修地点"></el-table-column>
        <el-table-column prop="status" label="维修方式"></el-table-column>
        <el-table-column prop="operation" label="维修成本/元"></el-table-column>
        <el-table-column prop="operation" label="维修内容"></el-table-column>
        <el-table-column prop="operation" label="备注"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
    
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import type { FormProps } from "element-plus";
import { useRouter, useRoute } from 'vue-router';
import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus'

const checked1 = ref(false)
const checked2 = ref(false)

const route = useRoute();
const startDate = ref(new Date());
const endDate = ref(new Date());
const labelPosition = ref<FormProps["labelPosition"]>("right");
const inputDate =  ref(route.query.faultDate);
const inputPhenomenon = ref(route.query.faultPhenomenon);
const inputNotes = ref(route.query.notes);
const equipmentId = ref(route.query.equipmentId)
// 其他表格数据...
const tableData = ref([]);
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  equipmentId: equipmentId,
  repairEngineer: '',
  repairTime: '',
  repairLocation: '',
  repairMoney: '',
  repairContext: '',
  repairNotes: '',
  checked1: false,
  checked2: false
})


var searchData = new FormData();

//历史已维修查询
// axios({
//   url: "/Equipment/EquipmentDetail",
//   data: searchData,
//   method: "post",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
// }).then((res) => {
//   if (res.status == 200) {
//     //确认保存后，即使清空
//     tableData.value = res.data.map(item => {
//       item.inputDate = new Date(item.inputDate).toLocaleDateString();
//       return item;
//     });
//   }
// });

//查询条件
const dataSearch = () => {

  const searchData = { startDate: startDate.value, endDate: endDate.value }
  axios({
    url: "/Equipment/EquipmentDetail/RepairHistory",
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

//维修登记
const RepairSubmit=()=>{
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
</script>
<style lang="less">
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
}

.ml-2 {
  margin: 10px;
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.dialog-inputs {
  margin-bottom: 20px;
}
</style>
