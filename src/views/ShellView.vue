<template>
    <div>
        <h1 class="header-content"> Shell</h1>
        <el-divider style="margin-bottom: 10px;margin-top: 10px;" />
        <el-skeleton v-if="!loadSuccess" :rows="10" />
        <iframe :src="iframeSrc" v-show="loadSuccess" ref="iframe" width="100%" frameborder="0" @load="onLoad"
            @error="handleError">
        </iframe>

    </div>

</template>

<script setup>
import { fa } from 'element-plus/es/locales.mjs';
import { ref, onMounted } from 'vue';
const iframeSrc = ref(""); // 替换为你想要加载的URL
const loadSuccess = ref(false);
// const iframe = ref(null);

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