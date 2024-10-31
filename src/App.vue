<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import LoginView from './views/LoginView.vue'
import NavView from './views/NavView.vue';
import { useStore } from 'vuex'
const store = useStore()

</script>

<template>
  <el-container v-if="store.state.isLoggedIn" class="common-layout" scrolling="no">
    <el-aside class="menu" width="200px">
      <NavView />
    </el-aside>
    <el-main style="padding-left: 1px;padding-right: 1px " >
        <router-view />
    </el-main>
  </el-container>
  <LoginView v-else />
</template>
