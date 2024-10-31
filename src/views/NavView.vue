<template>
  <el-row class="tac">
    <el-col :span="4">
      <h2 class="logo_title"><span class="gery_highlight">em</span><span class="yellow_highlight">Navi</span>Board</h2>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleMenuSelect"

      >
        <el-menu-item index="/">
          <el-icon><icon-menu /></el-icon>
          <span>Dashboard</span>
        </el-menu-item>
        <el-menu-item index="/shell">
          <el-icon><Monitor /></el-icon>
          <span>XShell</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>ROS Status</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <el-icon><setting /></el-icon>
          <span>Setting</span>
        </el-menu-item>
        <el-menu-item @click="handleLogout">
          <el-icon><CircleCloseFilled /></el-icon>
          <span>Logout</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Monitor,
  CircleCloseFilled,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const store = useStore(); // 获取 store
const router = useRouter();

const state = reactive({
    activeIndex: '/params',
    });
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


const handleMenuSelect = (index: string) => {
  state.activeIndex = index;
  console.log("index",index)
  router.push(index);
    };


const handleLogout = () => {
  // 执行登出逻辑
  console.log('Logging out...');
  store.commit('logout'); // 调用 store 的 increment 方法

  // 例如清除 Vuex 中的登录状态、清除 localStorage 等
  router.push('/login'); // 跳转到登录页
  // 其他登出逻辑...
  ElMessage.error('Logout');

};

</script>

<style>
.logo_title {
  color: #ffffff;
  text-align: center; /* 设置标题居中 */
  margin-left: 25px;
  margin-bottom: 2px; /* 你可以根据需要调整 */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 170px;
  height: 90vh;
  margin-right: 10px;
}
.yellow_highlight {
  color: #ffcc00e2; /* 设置第三个字母的颜色，例如黄色 */
  font-weight: bold; /* 可选，设置加粗 */
}
.gery_highlight {
  color: rgba(255,255,255, 0.5);
  font-weight: bold; /* 可选，设置加粗 */
}
</style>