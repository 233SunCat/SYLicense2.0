<template>
  <div id="app" style="height: 100%">
    <!-- <router-view/> -->
    <el-container style="height: 100%">
      <!-- <el-header style="display: block; height: 120px; border-color: blue;border-style:solid;"> -->
      <el-header style="height: 20%">
        <div style="height: 35%">
          <el-text class="mx-1" style="font-size: 23px">{{
            equipmentName
          }}</el-text>
        </div>
        <div style="height: 20%">
          <el-upload v-model:file-list="fileList" class="upload-demo"
                  action="http://localhost:3000/modules/upload" 
                  :data="uploadData"
                  :limit="3"
                  multiple
                  :on-change="handleChange"  
                  >
                        <el-link type="primary">上传相关附件</el-link>
                </el-upload>
          <el-divider />
        </div>
      </el-header>
      <el-main style="height: 80%">
        <div style="height: 10%; margin: 0px">
          <el-text class="mx-1" style="font-size: 22px">基础模块</el-text>
        </div>
        <div style="height: 10%">
          <el-button type="primary" round v-for="item in basicModule" :key="item">
            {{ item }}
          </el-button>
        </div>
        <div style="height: 50px">
          <el-text class="mx-1" style="font-size: 22px">实物模块</el-text>
        </div>
        <div style="height: 100px">
          <el-button type="primary" round v-for="item in entityModule" :key="item">{{ item }}</el-button>
        </div>
        <div style="height: 50px">
          <el-text class="mx-1" style="font-size: 22px">手术模块</el-text>
        </div>
        <div style="height: 30%">
          <el-row class="mb-4">
            <div style="width: 100%; display: flex; flex-direction: row">
              <el-card class="box-card" style="
                    height: 100%;
                    width: 30%;
                    display: flex;
                    flex-direction: column;
                  " v-for="(surgeryItem, key) in surgeryModule" :key="key">
                <template #header>
                  <div class="card-header">
                    <span>{{ key }}</span>
                  </div>
                </template>
                <div style="display: flex; flex-direction: column">
                  <el-button style="margin-top: 10px" round bg type="info" class="button" text v-for="item in surgeryItem"
                    :key="item">{{ item }}</el-button><br />
                </div>
              </el-card>
            </div>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import ButtonUpload from "@/components/ButtonUpload.vue";
import EventBus from "../assets/common/event-bus";
import axiosServer from "../assets/common/axios-server";
import qs from "qs"; // 引入 qs 库
import type { UploadInstance } from 'element-plus'
import { ElMessage } from 'element-plus';
import type { UploadProps, UploadUserFile } from 'element-plus'

const equipmentName = ref("");
const basicModule = ref(["基础技能训练", "缝合打结训练"])
const entityModule = ref(["实物训练模块"])
const surgeryModule = ref({
  胆囊手术训练: ["慢性胆囊手术训练", "急性胆囊手术训练"],
  妇科手术训练: ["慢性手术训练", "急性手术训练"],
});

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([
])
const submitUpload = () => {
  uploadRef.value!.submit()
}

/**
 * 上传文件
 */
 const handleChange = async (file, fileList) => {
  //fileList.value = fileList.value.slice(-3)
  // 处理上传结果
  if (file.status === 'success') {
    // 显示上传成功的提示
    ElMessage.success('文件 上传成功!');
  } else if (file.status === 'error') {
    // 显示上传失败的提示
    ElMessage.error('文件 上传失败，请重试或联系管理员!')
  }
  //await handleLoad()
};
/**
 * xml文件配置
 */
const module = ref([])
const ModuleXml = () => {
    axiosServer.AxiosGet( '/Model/ModelModuleXmlObject').then(res=>{
      console.log('res',res)
        module.value = res
    })
}
ModuleXml()
/**
 * 直接加载
 */
 var uploadData;
const handerBus = async (val: any) => {
  uploadData = {equipmentName: val.equipmetnName}
  equipmentName.value = val.equipmetnName;
}
EventBus.on("slide-product", handerBus);
</script>
<style>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  /* 允许换行 */
}

.box-card {
  margin: 10px;
  /* 调整卡片之间的间距 */
}
</style>