<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LoginView from './views/LoginView.vue'
import NavView from './views/NavView.vue';
import ShellView from './views/ShellView.vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'; // 导入 useRouter
import { ElMessage } from 'element-plus';

import axios from 'axios';
import { onMounted } from 'vue';

const route = useRoute()
const store = useStore()




// 验证连接状态
const handleVerifyLogin = async () => {
  const storedDeviceId = localStorage.getItem('device_id');
  console.log('Stored Device ID:', storedDeviceId);
  if (storedDeviceId !== null) {
    try {
      console.log('Verify Login Status', storedDeviceId);
      const response = await axios.get('/api/verify_login',{
        params: {
          device_id: storedDeviceId,
        }
      });
      if (response.data.status === 'success') {
        store.commit('login_in', storedDeviceId);
        ElMessage.success('登录验证成功');
      } else {
        ElMessage.error('登录验证失败');
      }
    } catch (error) {
      console.error('Login error:', error);
      ElMessage.error('登录验证时发生错误，请稍后重试。');
    }
  } else {
    ElMessage.error('未检测到登录信息，请登录');
  }
};
onMounted(() => {
  handleVerifyLogin();
});

</script>

<template>
  <el-container v-if="store.state.isLoggedIn" class="common-layout" scrolling="no">
    <el-aside class="menu" width="200px">
      <NavView />
    </el-aside>
    <el-main style="padding-left: 1px;padding-right: 1px " >
        <router-view />
        <!-- for iframe keep alive -->
        <ShellView v-show="route.path=='/shell'"/>
    </el-main>
  </el-container>
  <LoginView v-else />
</template>
