<template>
    <div>
      <el-button @click="toggleDarkMode">切换暗黑模式</el-button>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        style="height: 100%;"
      >
        <el-menu-item index="1">菜单项 1</el-menu-item>
        <el-menu-item index="2">菜单项 2</el-menu-item>
        <el-menu-item index="3">菜单项 3</el-menu-item>
      </el-menu>
    </div>
  </template>
  
  <script setup>
  const handleOpen = (key, keyPath) => {
    console.log('菜单打开:', key, keyPath);
  };
  
  const handleClose = (key, keyPath) => {
    console.log('菜单关闭:', key, keyPath);
  };
  
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.getAttribute('data-theme') === 'dark') {
      htmlElement.removeAttribute('data-theme');
    } else {
      htmlElement.setAttribute('data-theme', 'dark');
    }
  };
  </script>
  