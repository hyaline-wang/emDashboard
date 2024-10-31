<template>
  <div v-if="wifi.active == 'no'">
    <h3>正在连接到 {{ wifi.ssid }}</h3>
    <br />
    <el-row :gutter="20">
      <el-col :span="16">
        <el-input v-model="wifipasswd" autocomplete="off" placeholder="Please input password" />
      </el-col>

      <el-col :span="4">
        <el-button @click="connectToWifi" type="primary">
          <div>连接</div>
        </el-button>
      </el-col>
    </el-row>

    <div v-if="error">{{ error }}</div>
  </div>
  <div v-else>已连接</div>

</template>
<script setup>
import { ref, onMounted, defineProps,defineEmits  } from 'vue';
import axios from 'axios';
import { ElNotification } from 'element-plus'
const emit = defineEmits(['submit','connect_success']);
const props = defineProps({
  wifi: {
    type: Object,
    required: true,
  },
});
const error = ref(null);

const wifipasswd = ref('');

function submit() {
  // 执行提交操作
  console.log("提交操作");
}

const connectToWifi = async () => {
  emit('submit'); // 发出提交事件
  ElNotification({
    title: '连接WiFi',
    message: '正在连接到' + props.wifi.ssid,
    type: 'info',
  })
  try {
    const postData = {
      ssid: props.wifi.ssid,
      password: wifipasswd.value,
    };
    console.log(postData);
    const response = await axios.post('/api/connect', postData);
    if (response.data.status === 'success') {
      ElNotification({
        title: '连接WiFi',
        message: '成功连接到' + props.wifi.ssid,
        type: 'success',
      })
      emit('connect_success'); // 发出提交事件


    } else {
      ElNotification({
        title: '连接WiFi',
        message: '连接失败：' + props.wifi.ssid+response.data.message,
        type: 'error',
      })
    }
  } catch (err) {
    ElNotification({
        title: '连接WiFi',
        message:'连接时发生错误：' + err.message,
        type: 'error',
      })
  }
};

// 在组件挂载时获取 WiFi 列表
// onMounted(fetchWifiList);
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}
</style>