<template>
  <!-- 主應用容器 -->
  <div>
    <!-- 路由視圖 -->
    <NuxtPage />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";

// 定義服務數據和熱門地區的響應式變數
const services = ref([]);
const popularLocations = ref([]);

// 將熱門地區提供給其他組件使用
provide('popularLocations', popularLocations);

async function getServices() {
  // 使用插件提供的 Supabase 客戶端
  const { $supabase } = useNuxtApp();
  
  try {
    // 獲取所有服務的 location 欄位
    const { data, error } = await $supabase.from("services").select("location");

    if (error) throw error;
    
    // 存儲原始數據
    services.value = data || [];
    
    // 計算每個 location 的數量
    const locationCounts = {};
    data.forEach(item => {
      if (item.location && item.location.trim()) {
        locationCounts[item.location] = (locationCounts[item.location] || 0) + 1;
      }
    });
    
    // 轉換為數組並按數量降序排序
    const sortedLocations = Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count);
    
    // 取前 5 筆熱門地區
    popularLocations.value = sortedLocations.slice(0, 5);
    
    console.log('熱門地區排序結果:', popularLocations.value);
  } catch (err) {
    console.error('獲取服務數據失敗:', err);
  }
}

onMounted(() => {
  getServices();
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
