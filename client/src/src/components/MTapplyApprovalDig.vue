<template>
  <div class="common-layout" style="height: 100%">
    <div style="height:60px;display: flex; align-items: center; justify-content: center;">
      <el-text class="line-break" size="large">申请模块详情</el-text>
    </div>
    <div style="height:60px;">
      <el-text class="line-break" size="large">申请模块-腹腔镜模块</el-text>
    </div>
    <div style="height:60px;">
      <el-text class="line-break" size="large" style="margin-right:20px">申请人-兔子</el-text>
      <el-text class="line-break" size="large" style="margin-right:20px">设备名称</el-text>
      <el-text class="line-break" size="large" style="margin-right:20px">申请时间</el-text>
    </div>
    <div style="display: flex; align-items: center; justify-content: center;">
    <el-form
      class="demo-form-inline"
      :label-position="labelPosition"
      label-width="120px"
      style="max-width: 100%; width: 80%"
    >
      <el-form-item
        :label="key"
        v-for="(values, key) in moduleMap"
        :key="key"
        style="background-color: #f0f3f4"
      >
        <div style="width: 100%; height: 20px"></div>
        <el-row :gutter="10" style="width: 80%">
          <el-col :span="3" v-for="item in values" :key="item">
            <el-button type="info">{{ item }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确认保存</el-button>
        <el-button type="primary">取消</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, inject } from "vue";
import { defineComponent } from "vue";

import axios from "axios";
import type { FormProps } from "element-plus";
import type { Action } from "element-plus";
import type { UploadInstance } from "element-plus";

//myMap.set('缝合打结训练', ['缝合训练', '打结训练']);

//const moduleMap = {'技能训练':['实物训练','基础训练']}

const moduleMap = ref({
  技能训练: ["实物训练", "基础训练", "基础训练", "基础训练"],
  缝合打结训练: ["缝合训练", "打结训练"],
});
</script>

<style lang="less">
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
