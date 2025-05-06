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
const servicesInRegion = ref([]);

// 將熱門地區和地區數據提供給其他組件使用
provide("popularLocations", popularLocations);
provide("servicesInRegion", servicesInRegion);

async function getServices() {
  // 使用插件提供的 Supabase 客戶端
  const { $supabase } = useNuxtApp();

  try {
    // 獲取所有服務的 location 欄位
    const { data, error } = await $supabase.from("services").select("location, region");

    if (error) throw error;

    // 存儲原始數據
    services.value = data || [];

    // 計算每個 location 的數量
    const locationCounts = {};
    // 計算每個 region 的數量
    const regionCounts = {};

    data.forEach(item => {
      // 統計 location
      if (item.location && item.location.trim()) {
        locationCounts[item.location] = (locationCounts[item.location] || 0) + 1;
      }

      // 統計 region
      if (item.region && item.region.trim()) {
        regionCounts[item.region] = (regionCounts[item.region] || 0) + 1;
      }
    });

    // 處理 location 數據
    const sortedLocations = Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count);

    // 取前 5 筆熱門地區
    popularLocations.value = sortedLocations.slice(0, 5);

    // 處理 region 數據
    const sortedRegions = Object.entries(regionCounts)
      .map(([region, count]) => ({ region, count }))
      .sort((a, b) => b.count - a.count);

    // 所有地區數據
    servicesInRegion.value = sortedRegions;

    console.log("熱門地區排序結果:", popularLocations.value);
    console.log("地區統計結果:", servicesInRegion.value);
  } catch (err) {
    console.error("獲取服務數據失敗:", err);
  }
}

getServices();
onMounted(() => {});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
