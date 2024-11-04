<template>
    <div ref="editorContainer" class="editor-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as monaco from 'monaco-editor';

const editorContainer = ref(null);
let editor = null;



onMounted(() => {
    editor = monaco.editor.create(editorContainer.value, {
        value: '// 你的代码...',
        language: 'python',
        theme: "vs-dark",
        automaticLayout: true
    });

    // 监听窗口大小变化以自动调整编辑器大小
    // window.addEventListener('resize', () => editor.layout());
});

onBeforeUnmount(() => {
    // 清理编辑器实例
    if (editor) {
        editor.dispose();
    }
});
</script>

<style scoped>
.editor-container {
    height: 80vh;
    /* 设置你需要的高度 */
    width: 100%;
    /* 或其他宽度 */
}
</style>