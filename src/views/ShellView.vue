<template>
    <div>
        <h1 class="header-content"> Shell</h1>
        <el-divider style="margin-bottom: 10px;margin-top: 10px;" />
        <el-skeleton v-if="!loadSuccess" :rows="10" />
        <iframe :src="iframeSrc" v-show="loadSuccess" ref="iframe" width="100%" frameborder="0" @load="onLoad"
            @error="handleError">
        </iframe>

    <!-- <el-button plain @click="dialogVisible = true">
        Click to open the Dialog
    </el-button> -->
    <!-- <el-dialog v-model="dialogVisible" title="CodeEidtor" width="90%" top="3vh">
        <CodeEidtor />
    </el-dialog> -->
    </div>

</template>

<script setup>
// import CodeEidtor from '@/components/CodeEidtor.vue';
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';

// 创建响应式变量
const message = ref('');
const messages = ref([]);
// const socket = io('/codews/socket.io');
// const socket = io('http://localhost:5000');

// // 监听响应事件
// socket.on('response', (data) => {
//   messages.value.push(data);
//   console.log('Received message:', data);
// });

// // 发送消息的函数
// const sendMessage = () => {
//   if (message.value) {
//     // 发送消息到 Flask 服务器
//     console.log('Sending message:', message.value);
//     socket.emit('message', message.value);
//     message.value = ''; // 清空输入框
//   }
// };
const iframeSrc = ref(""); // 替换为你想要加载的URL
const loadSuccess = ref(false);
// const iframe = ref(null);
const dialogVisible = ref(false)

// 定义调用 API 的函数
// const startTtyd = async () => {
//   try {
//     const response = await axios.get('/api/start-ttyd',{
//         params: {
//           device_id: store.state.device_id,
//         }
//       });
//     console.info( response.data.message);

//   } catch (error) {
//     console.error('Error starting ttyd:', error);
//   }
// };


// 在组件挂载时设置默认的 iframe URL
onMounted(() => {
    iframeSrc.value = '/ttyd/'; // 替换为你想要加载的URL
});

const onLoad = () => {
    console.log('Load iframe.');

    loadSuccess.value = true; // 加载成功
    //   if (iframe.value) {
    //     iframe.value.style.height = iframe.value.contentWindow.document.body.scrollHeight + 'px';
    //   }
};
const handleError = () => {
    console.log('Failed to load iframe.');
};

</script>
<style>
.grid-content {
    color: #f0f2f5;
    /* border-radius: 4px; */
    /* margin: 20px; */
    /* padding: 20px; */
}
.header-content {
  border-radius: 4px;
  /* min-height: 28px; */
  font-size: 28px;
  color: #faf8f8;
}
iframe {
    border: none;
    /* 去掉边框 */
    height: 80vh;
    /* 高度 100% */
    width: 100%;
    /* 宽度 100% */
    overflow: hidden;
    /* 隐藏滚动条 */
}
</style>