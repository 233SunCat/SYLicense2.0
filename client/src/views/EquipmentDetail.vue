<template style="height:100%;">
  <div  style="height: 100%; width: 100%">
    <div style="display: flex; justify-content: center">
      <el-text class="mx-1" style="font-size: 20px">{{ equipmentName }}</el-text>
      <el-tag style="margin: 10px">{{ qualiyStatus }}</el-tag>
      <br />
      <el-tag style="margin: 10px" class="ml-2" type="warning">{{ status }}</el-tag>
    </div>
    <div style="height: 8%; display: flex; justify-content: center">
      <el-tag class="ml-2" type="info">用户名称：{{ clientName }}</el-tag>
      <el-tag class="ml-2" type="info">设备编号：{{ equipmentId }}</el-tag>
      <el-tag class="ml-2" type="info">质保期：{{ protectTime }}</el-tag>
      <el-tag class="ml-2" type="info">剩余质保期：{{ protectTimeLast }}</el-tag>
    </div>
    <div >
        <div style="display: flex; justify-content: center">
        <el-text class="mx-1" style="font-size: 20px">故障详情</el-text>
      </div>
      <div  style="display: flex; justify-content: center;width: 100%;">
        <el-form :inline="false" class="demo-form-inline" :label-position="labelPosition" label-width="120px" style="width: 30%;">
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
            <el-button type="primary" plain @click="dialogFormVisible = true">填写维修记录</el-button>
            <!-- Form -->
            <el-dialog v-model="dialogFormVisible" title="维修记录">
              <el-form :model="form" :inline="false" class="demo-form-inline" :label-position="labelPosition"
                label-width="120px">
                <el-form-item label="维修人员：" :label-width="formLabelWidth">
                  <el-input v-model="form.repairEngineer" autocomplete="off" class="dialog-inputs" />
                </el-form-item>
                <el-form-item label="维修时间：" :label-width="formLabelWidth">
                  <el-date-picker v-model="form.repairDate" type="date" placeholder="选择维修时间" class="dialog-inputs">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="维修地点：" :label-width="formLabelWidth">
                  <el-input v-model="form.repairLocation" autocomplete="off" class="dialog-inputs" />
                </el-form-item>
                <el-form-item label="维修方式：">
                  <el-radio-group v-model="form.repairWay" class="ml-4">
                    <el-radio label="现场维修" size="large">现场维修</el-radio>
                    <el-radio label="返厂" size="large">无法维修，返厂</el-radio>
                  </el-radio-group>
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
          <el-form-item label="故障现象图片" >
            <div class="demo-image"  v-for="url, index in imageInitUrls" :key="index">
              <template v-if="isImage(url)">
                <el-image :src="url" :fit="index" :preview-src-list="[url]" />
              </template>
              <template v-else>
                <video controls :src="url" style="width: 100%; height: auto;"></video>
              </template>
            </div>
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
      <el-table :data="tableData" :default-sort="{ prop: 'faultDate', order: 'descending' }">
        <el-table-column prop="repairStatus" label="状态"></el-table-column>
        <el-table-column prop="faultDate" label="故障时间"></el-table-column>
        <el-table-column prop="faultPhenomenon" label="故障现象"></el-table-column>
        <el-table-column prop="imageVideo" label="故障图片">
          <template #default="scope">
            <el-button type="success" plain @click="handleImageClick(scope.row)">图片详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="repairEngineer" label="维修人"></el-table-column>
        <el-table-column prop="repairDate" label="维修时间"></el-table-column>
        <el-table-column prop="repairLocation" label="维修地点"></el-table-column>
        <el-table-column prop="repairWay" label="维修方式"></el-table-column>
        <el-table-column prop="repairMoney" label="维修成本/元"></el-table-column>
        <el-table-column prop="repairContext" label="维修内容"></el-table-column>
        <el-table-column prop="repairNotes" label="备注"></el-table-column>
      </el-table>
      <div>
        <el-row>
          <el-col :span="4">
            <el-statistic title="当前维修设备总次数" :value="repairCount" />
          </el-col>
          <el-col :span="4">
            <el-statistic title="维修总成本" :value="repairMoney" />
          </el-col>
        </el-row>
      </div>
      <el-dialog v-model="dialogImageVisible" title="维修记录">
        <div class="demo-image">
          <div v-for="url, index in imageUrls" :key="index" class="block">
            <span class="demonstration">{{ index }}</span>
              <template v-if="isImage(url)">
                  <el-image :src="url" :fit="index" :preview-src-list="[url]" />
                </template>
              <template v-else>
                <video controls :src="url" style="width: 100%; height: auto;"></video>
              </template>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="handleImageCancel">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
    
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import type { FormProps } from "element-plus";
import { useRouter, useRoute } from 'vue-router';
import axios from "axios";
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'
import axiosServer from '../assets/common/axios-server'
import messageBox from '../assets/common/message-box'
import qs from 'qs'; // 引入 qs 库

const repairCount = ref(0)
const repairMoney = ref(0)
const dialogImageVisible = ref(false)
const route = useRoute();
const startDate = ref(new Date());
startDate.value.setMonth(startDate.value.getMonth() - 1);

const endDate = ref(new Date());
const labelPosition = ref<FormProps["labelPosition"]>("right");
const inputDate = ref(dayjs(route.query.faultDate).format("YYYY-MM-DD"));
const faultDate = route.query.faultDate
const faultPhenomenon = route.query.faultPhenomenon
const inputPhenomenon = ref(route.query.faultPhenomenon);
const inputNotes = ref(route.query.notes);
const clientName = route.query.clientName
const equipmentId = route.query.equipmentId
const protectTime = ref(route.query.protectTime)
const status = ref(route.query.status)
// 假设 protectTime 和 signforDate 都是日期对象
var signforDate = new Date(route.query.signforDate);
// 计算质保剩余时间
const currentTime = new Date(); // 现在的时间
const timeDifference = currentTime.getTime() - signforDate.getTime();
// 将剩余时间转换为天数（或其他你需要的时间单位）
const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
// 将结果赋值给 protectTimeLast
const protectTimeLast = ref(protectTime.value - remainingDays)
var qualiyStatus = ref('')
if (protectTimeLast.value > 0) {
  qualiyStatus.value = "在保"
} else {
  qualiyStatus.value = "过保"
}
const equipmentName = route.query.equipmentName
const imageVideo = route.query.imageVideo
// 其他表格数据...
const tableData = ref([]);
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  equipmentName: equipmentName,
  equipmentId: equipmentId,
  clientName: clientName,
  faultDate: faultDate,
  faultPhenomenon: faultPhenomenon,
  imageVideo: imageVideo,
  repairEngineer: '',
  repairDate: Date(),
  repairLocation: '',
  repairMoney: '',
  repairContext: '',
  repairNotes: '',
  repairWay: '现场维修'
})
var imageUrls = ref([])
const handleImageClick = (row: any) => {
  dialogImageVisible.value = true
  const imageVideo = row.imageVideo
  imageUrls = imageVideo.map((fileName: string) => {
    return 'http://localhost:3000/DownloadAndUpload/faultImage/' + fileName;
  });
}

const handleImageCancel = () => {
  dialogImageVisible.value = false
}

const imageInitUrls = ref([])
const ImageView = () => {
  //得到最新的故障
  const searchData = { equipmentId: equipmentId }
  axiosServer.AxiosPost(qs.stringify(searchData), '/Equipment/EquipmentSearchImage').then((res) => {
    const imageVideo = res
    console.log('imageVideo', imageVideo)
    imageInitUrls.value = imageVideo.map((fileName: string) => {
      return 'http://localhost:3000/DownloadAndUpload/faultImage/' + fileName;
    });
  });
}
ImageView()

const isImage = (url) => {
  // 判断文件类型，这里简单地通过文件扩展名进行判断
  const extension = url.split('.').pop().toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'jfif'].includes(extension);
}

//查询条件
const dataSearch = () => {
  const searchData = { startDate: startDate.value, endDate: endDate.value, equipmentId: equipmentId }
  axiosServer.AxiosPost(qs.stringify(searchData), '/Equipment/EquipmentDetail/RepairSearch').then((res) => {
    repairCount.value = res.length
    // 使用 reduce 方法对 contractMoney 字段进行相加
    const totalContractMoney: number = res.reduce((sum, item) => {
      console.log('', item)
      const contractMoney = parseFloat(item.repairMoney) || 0; // 将字符串转换为数字，如果无法转换则为 0
      return sum + contractMoney;
    }, 0);
    repairMoney.value = totalContractMoney

    //确认保存后，即使清空
    tableData.value = res.map(item => {
      item.repairDate = new Date(item.repairDate).toLocaleDateString()
      item.faultDate = new Date(item.faultDate).toLocaleDateString()
      return item;
    });
  });
}

//维修登记
const RepairSubmit = () => {
  axiosServer.AxiosPost(qs.stringify(form), '/Equipment/EquipmentDetail/RepairSubmit').then(res => {
    if (res.success == true) {
      messageBox.MessageBox('保存成功')
      dialogFormVisible.value = false
    } else {
      messageBox.MessageBox('保存失败')
    }
  })
}
</script>
<style lang="less" scoped>
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

.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image .block:last-child {
  border-right: none;
}

.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
