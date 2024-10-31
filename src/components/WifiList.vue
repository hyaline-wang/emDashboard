<template>
    <div>
        <el-button @click="fetchWifiList" type="primary">

            <div v-if="loading">正在加载...</div>
            <div v-else>刷新</div>
        </el-button>
        <div v-if="error">{{ error }}</div>
        <br />
        <el-table v-loading="loading" :data="wifiList" style="width: 100%" :row-class-name="rowClassName">
            <el-table-column prop="ssid" label="SSID" width="160">
            </el-table-column>
            <el-table-column prop="channel" label="CHAN" width="100">
            </el-table-column>
            <el-table-column prop="signal" label="SIGNAL" width="80">
            </el-table-column>
            <el-table-column prop="security" label="SECURITY" width="100">
            </el-table-column>

            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button v-if="scope.row.active=='no'" @click="selectWifi(scope.row)" type="primary">连接</el-button>
                    <div v-else>已连接</div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="ready_to_connect" title="WIFI连接" :align-center="true" width="400">
            <WifiConnect :wifi="selectedWifi" @submit="handleSubmit" @connect_success="fetchWifiList"/>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted,defineEmits } from 'vue';
import axios from 'axios';
import WifiConnect from "../components/WifiConnect.vue";
const emit = defineEmits(['sta_connect']);

const wifiList = ref([]);
const loading = ref(false);
const error = ref(null);
function handleSubmit() {
  // 执行提交操作（可选）
  ready_to_connect.value = false; // 关闭对话框
}



const ready_to_connect = ref(false);
const rowClassName = ({ row }) => {
    console.log(row);
    console.log(row.active == 'yes' ? 'success-row' : '');
    return row.active == 'yes' ? 'success-row' : ''; // 如果 active 不是 'yes'，则返回高亮类
};

const selectedWifi = ref(null);
const selectWifi = (wifi) => {
    selectedWifi.value = wifi; // 选中当前 WiFi
    ready_to_connect.value = true; // 打开对话框
};
const fetchWifiList = async () => {
    emit("sta_connect"); // 发出提交事件
    loading.value = true;
    error.value = null;

    try {
        const response = await axios.get('/api/wifi'); // 替换为你的 API 地址
        wifiList.value = response.data; // 假设返回的数据是一个 WiFi 对象数组
    } catch (err) {
        error.value = '无法获取 WiFi 列表';
        console.error(err);
    } finally {
        loading.value = false;
    }
};

// 在组件挂载时获取 WiFi 列表
onMounted(fetchWifiList);
</script>

<style>
.el-table .success-row {
    /* --el-table-tr-bg-color: var(--el-color-warning-light-9); */
    --el-table-tr-bg-color: #45553d96;
}
</style>