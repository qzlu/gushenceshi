import { sa } from './utils/sensorsdata'
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'    
sa.init()
const app = new Vue(App)
app.$mount()
