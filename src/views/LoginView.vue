<template>
  <el-container class="login-container">
    <div class="background"></div>

    <el-card>
      <h2 style="text-align: center;">登录</h2>
      <br />
      <el-form :model="form" :rules="rules" ref="formRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <!-- <el-button @click="() => formRef.value.resetFields()">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; // 导入 useRouter
import axios from 'axios';

const form = ref({
  username: '',
  password: ''
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
};

const formRef = ref(null);
const store = useStore(); // 获取 store
const router = useRouter(); // 获取 router

const handleLogin = async () => {
  const valid = await formRef.value.validate();
  if (valid) {
    try {
      // 假设你有一个表单数据对象
      const loginData = {
        username: form.value.username,
        password: form.value.password,
      };
      console.log('Logging in with', loginData);

      // 发送登录请求
      const response = await axios.post('/api/login', loginData);

      if (response.data.status === 'success') {
        // 在这里处理成功的登录逻辑
        store.commit('login_in', response.data.device_id); // 调用 store 的 login_in 方法
        router.push('/shell'); // 跳转到首页或其他页面
        ElMessage.success('登录成功！');
      } else {
        ElMessage.error('登录失败：' + response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      ElMessage.error('登录时发生错误，请稍后重试。');
    }
  } else {
    ElMessage.error('请检查输入信息。');
  }
};
</script>

<style>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* 确保背景层定位正确 */
  overflow: hidden; /* 避免背景溢出 */

}

.background {
  position: absolute; /* 绝对定位背景 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('http://110.42.45.189:18080/wallpaper/20241022-180345.jpg'); /* 替换为你的背景图 URL */
  background-size: cover; /* 使背景图覆盖整个容器 */
  background-position: center; /* 背景图居中 */
  filter: blur(2px); /* 添加模糊效果 */
  z-index: 1; /* 确保背景在下面 */
}

.el-card {
  position: relative; /* 确保卡片在背景之上 */
  z-index: 2; /* 确保卡片在背景之上 */
  width: 400px;
  background-color: rgba(18, 18, 18, 0.95); /* 使卡片稍微透明，以便背景可见 */
  border-radius: 10px; /* 设置圆角半径 */
}
</style>
