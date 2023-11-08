<template>
  <div id="app" style="height: 100%;">
      <!-- <router-view/> -->
      <el-container style=" height: 100%;">
          <!-- <el-header style="display: block; height: 120px; border-color: blue;border-style:solid;"> -->
        <el-header style="height: 20%; ">
            <div style="height: 35%;">
              <el-text class="mx-1" style="font-size: 23px;">力反馈腹腔镜</el-text>
            </div>
            <div style="height: 20%;">
              <ButtonUpload/>
              <el-divider />
            </div>
          </el-header>
          <el-main style="height: 80%;">
              <div style="height: 10%;margin:0px;">
                  <el-text class="mx-1" style="font-size: 22px;">基础模块</el-text>
              </div>
              <div style="height: 10%;">
                  <el-button type="primary" round>基础技能训练</el-button>
                  <el-button type="primary" round>缝合打结训练</el-button>
              </div>
              <div style="height: 50px;">
                  <el-text class="mx-1" style="font-size: 22px;">实物模块</el-text>
              </div>
              <div style="height: 100px;">
                  <el-button type="primary" round>实物训练模块</el-button>
              </div>
              <div style="height: 50px;">
                  <el-text class="mx-1" style="font-size: 22px;">手术模块</el-text>
              </div>
              <div style="height: 30%;">
                  <el-row class="mb-4">
                    <div style="width: 32%;">
                        <CardInfo/>
                    </div>
                    <div style="width: 32%;">
                        <CardInfo/>
                    </div>
                    <div style="width: 30%;">
                        <CardInfo/>
                    </div>
                  </el-row>
              </div>
          </el-main>
      </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ButtonUpload from '@/components/ButtonUpload.vue'
import CardInfo from '@/components/CardInfo.vue'

export default defineComponent({
  name: 'App',
  components: {
      ButtonUpload,
      CardInfo
  }
})
</script>
<style lang="less">
</style>
