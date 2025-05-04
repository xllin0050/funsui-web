<template>
  <div class="region-page bg-poseidon-50 min-h-screen p-6">
    <div class="container mx-auto">
      <!-- 返回首頁按鈕 -->
      <button
      class="mb-6 flex items-center text-teal-700 hover:text-teal-900 transition-colors"
        @click="router.push('/')"
      >
        <span class="mr-2">←</span> 返回首頁
      </button>

      <!-- 地區標題 -->
      <h1 class="text-3xl font-bold text-teal-800 mb-6">{{ regionName }} 潛水服務</h1>

      <!-- 載入中提示 -->
      <div v-if="loading" class="bg-white rounded-lg shadow-md p-8 text-center">
        <p class="text-lg text-gray-600">正在載入 {{ regionName }} 的潛水服務...</p>
      </div>

      <!-- 錯誤提示 -->
      <div v-else-if="error" class="bg-white rounded-lg shadow-md p-8 text-center">
        <p class="text-lg text-red-600">{{ error }}</p>
        <button
        class="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
          @click="fetchRegionServices"
        >
          重試
        </button>
      </div>

      <!-- 無數據提示 -->
      <div v-else-if="!services.length" class="bg-white rounded-lg shadow-md p-8 text-center">
        <p class="text-lg text-gray-600">目前 {{ regionName }} 地區尚無潛水服務資料。</p>
      </div>

      <!-- 服務列表 -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="service in services"
          :key="service.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div class="h-48 bg-gray-200 relative">
            <img
              v-if="service.image_url"
              :src="service.image_url"
              :alt="service.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-teal-100">
              <span class="text-teal-700">{{ service.name }}</span>
            </div>
            <div class="absolute top-2 right-2 bg-teal-600 text-white px-2 py-1 rounded text-sm">
              {{ service.service_type }}
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-xl font-semibold text-teal-800 mb-2">{{ service.name }}</h3>
            <p class="text-gray-600 mb-3 line-clamp-2">{{ service.description || "無描述" }}</p>
            <div class="flex justify-between items-center">
              <span class="text-teal-700 font-medium">NT$ {{ service.price || "洽詢" }}</span>
              <button
                class="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 transition-colors"
              >
                查看詳情
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 狀態
const services = ref([]);
const loading = ref(true);
const error = ref(null);

// 計算屬性
const regionId = computed(() => route.params.id);

// 地區名稱映射
const regionNames = {
  north: "北部",
  east: "東部",
  south: "南部",
  islands: "離島",
};

// 計算當前地區名稱
const regionName = computed(() => {
  return regionNames[regionId.value] || regionId.value;
});

// 獲取特定地區的服務數據
async function fetchRegionServices() {
  loading.value = true;
  error.value = null;

  try {
    const { $supabase } = useNuxtApp();

    // 從 Supabase 獲取特定地區的服務數據
    const { data, error: supabaseError } = await $supabase
      .from("services")
      .select("*")
      .eq("region", regionId.value);

    if (supabaseError) {
      throw supabaseError;
    }

    services.value = data || [];
    console.log(`已載入 ${regionName.value} 地區的服務數據:`, services.value);
  } catch (err) {
    console.error("獲取服務數據時出錯:", err);
    error.value = `獲取服務數據時出錯: ${err.message || "未知錯誤"}`;
  } finally {
    loading.value = false;
  }
}

// 生命週期鉤子
onMounted(() => {
  fetchRegionServices();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; /* 添加標準屬性 */
  -webkit-box-orient: vertical;
  box-orient: vertical; /* 添加標準屬性 */
  overflow: hidden;
}
</style>
