import { createApp } from 'vue'
import App from './App.vue'
import AppTest from './AppTest.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//import '@element-plus/icons-vue/dist/index.js'
//import * as ElIcon from '@element-plus/icons-vue'
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000'
// createApp(App).use(router).use(ElIcon).use(ElementPlus).mount('#app')
createApp(AppTest).use(router).use(ElementPlus).mount('#app')
