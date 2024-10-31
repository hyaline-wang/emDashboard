import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/dark/css-vars.css'

// Create a new store instance.
const store = createStore({
    state () {
      return {
        count: 0,
        // isLoggedIn: false,
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // 从 localStorage 读取状态


      }
    },
    mutations: {
      increment (state) {
        state.count++;
        state.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true'); // 设置 localStorage
        console.log('state.count', state.count)
        console.log('state.isLoggedIn', state.isLoggedIn)
      },
      logout (state) {
        localStorage.removeItem('isLoggedIn'); // 示例：清除 localStorage 中的登录状态
        state.isLoggedIn = false;

      }
    }
  })
  

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
