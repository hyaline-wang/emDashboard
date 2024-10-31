<template>
  <h1 class="header-content"> Setting</h1>
  <el-divider style="margin-bottom: 10px;" />
  <div class="setting-divider">Network</div>
  <!-- 设置WiFi模式 -->
  <el-row :gutter="20">
    <el-col :span="10">
      <div class="setting-content">WIFI模式</div>
    </el-col>
    <el-col :span="2">
      <el-select v-model="next_wifi_type" placeholder="unknow" style="width: 240px">
        <el-option v-for="item in WifiType" :key="item.value" :label="item.label" :value="item.value" />
      </el-select> </el-col>
  </el-row>
  <el-row :gutter="20" v-if="next_wifi_type == 'sta'">
    <el-col :span="10">
      <div class="setting-2nd-content">连接至WIFI</div>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" plain @click="dialogTableVisible = true">选择WIFi</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="20" v-if="next_wifi_type == 'ap' && current_wifi_type != 'ap'">
    <el-col :span="10">
      <div class="setting-2nd-content">切换至AP模式</div>
    </el-col>
    <el-col :span="2">
      <el-popconfirm title="确认切换至AP模式吗" @confirm="changetoApMode">
        <template #reference>
          <el-button type="primary" plain>切换</el-button>
        </template>
      </el-popconfirm>
    </el-col>
  </el-row>
  <el-row :gutter="20" v-if="next_wifi_type == 'ap' && current_wifi_type == 'ap'">
    <el-col :span="10">
      <div class="setting-2nd-content">AP SSID</div>
    </el-col>
    <el-col :span="10">
      <div class="setting-content">{{ ap_wifi_name }}</div>
    </el-col>
  </el-row>

  <el-dialog v-model="dialogTableVisible" title="WIFI列表" width="600">
    <WifiList @sta_connect="getCurrentSetting"/>
  </el-dialog>
  <!-- 设置服务器转发 -->
  <el-row :gutter="20">
    <el-col :span="10">
      <div class="setting-content">转发服务器地址</div>
    </el-col>
    <el-col :span="2">
      <el-input style="width: 240px;" placeholder="127.0.0.1:7890">
        <template #prepend>http://</template>
      </el-input>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="10">
      <div class="setting-content">使用服务器转发</div>
    </el-col>
    <el-col :span="2">
      <el-switch v-model="is_forward" />
    </el-col>
  </el-row>
  <!-- 其他 -->
  <div class="setting-divider">User</div>

</template>
<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { ElNotification } from 'element-plus'
import axios from 'axios';
import WifiList from "../components/WifiList.vue";

const collapseNewwork = ref(false);

const ap_wifi_name = ref('');
const next_wifi_type = ref('');
const current_wifi_type = ref('');
const is_forward = ref(false);

const dialogTableVisible = ref(false)

const isSta = ref(false);
const settings = {
  connect_type: '',
  enableFeature: false,
  username: '',
  theme: 'light'
}
const WifiType = [
  {
    value: 'ap',
    label: 'AP(热点模式)',
  },
  {
    value: 'sta',
    label: 'STA(连接至路由器)',
  }
]


const changetoApMode = async () => {
  ElNotification({
    title: '切换至AP模式',
    message: '稍后请重新连接至设备wifi:'+ap_wifi_name.value,
    type: 'info',
    duration: 10000
  })
  try {
        const response = await axios.get('/api/set-ap-mode'); // 替换为你的 API 地址
        console.log(response.data);
        if(response.data.status === 'success'){
          ap_wifi_name.value = response.data.ap_wifi_name; 
          current_wifi_type.value = 'ap';
          next_wifi_type.value = 'ap';
          ElNotification({
            title: '切换至AP模式',
            message: '成功切换至AP模式',
            type: 'success',
          })
        }
        else{
          ElNotification({
            title: '切换至AP模式',
            message: '切换至AP模式失败',
            type: 'error',
          })
        }
    } catch (err) {
        // error.value = '无法获取 WiFi 列表';
        // console.error(err);
    } finally {
        // loading.value = false;
    }

}





const getCurrentSetting = async () => {

    try {
        // 并行请求
        const [wifiModeResponse, apWifiNameResponse] = await Promise.all([
            axios.get('/api/get-wifi-mode'),
            axios.get('/api/get-ap-wifi-name'),
        ]);

        // 处理 WiFi 模式
        console.log(wifiModeResponse.data);
        current_wifi_type.value = wifiModeResponse.data.mode;
        next_wifi_type.value = wifiModeResponse.data.mode;

        // 处理 AP 模式下的 WiFi 名称
        console.log(apWifiNameResponse.data);
        ap_wifi_name.value = apWifiNameResponse.data.ap_wifi_name;

    } catch (err) {
        console.error(err);
    } finally {
        // loading.value = false; // 无论成功与否，结束加载状态
    }
};

onMounted(getCurrentSetting);
</script>

<style scoped>
.setting-param {
  margin-right: 50px;
  
}

.header-content {
  border-radius: 4px;
  /* min-height: 28px; */
  font-size: 28px;
  color: #faf8f8;
}
.setting-content {
  border-radius: 4px;
  min-height: 36px;
  font-size: 14px;
  color: #faf8f8;
}
.setting-2nd-content {
  border-radius: 4px;
  min-height: 36px;
  font-size: 13px;
  margin-left: 30px;
  color: #faf8f8;
}

.setting-value {
  /* margin-bottom: 16px; */
  position: relative;
  float: right;
}

.setting-divider {
  color: #ffffff;
  background-color: rgb(37, 37, 37);
  font-size: 18px;
  font-weight: bold;
  /* margin-top: 20px; */
  margin-bottom: 10px;
}
</style>