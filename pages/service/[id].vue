<template>
  <div class="service-detail-page bg-poseidon-50 min-h-screen p-6">
    <div class="container mx-auto">
      <!-- 返回按鈕 -->
      <button
        class="mb-6 flex items-center text-teal-700 hover:text-teal-900 transition-colors"
        @click="router.back()"
      >
        <span class="mr-2">←</span> 返回
      </button>

      <!-- 載入中提示 -->
      <div v-if="loading" class="bg-white rounded-lg shadow-md p-8 text-center">
        <p class="text-lg text-gray-600">正在載入服務詳情...</p>
      </div>

      <!-- 錯誤提示 -->
      <div v-else-if="error" class="bg-white rounded-lg shadow-md p-8 text-center">
        <p class="text-lg text-red-600">{{ error }}</p>
        <button
          class="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
          @click="fetchServiceDetails"
        >
          重試
        </button>
      </div>

      <!-- 無數據提示 -->
      <div v-else-if="!service" class="bg-white rounded-lg shadow-md p-8 text-center">
        <p class="text-lg text-gray-600">找不到此服務的詳細資料</p>
      </div>

      <!-- 服務詳情 -->
      <div v-else class="service-detail bg-white rounded-lg shadow-md overflow-hidden">
        <!-- 服務標題區 -->
        <div class="service-header p-6 bg-teal-50 border-b border-teal-100">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-3xl font-bold text-teal-800 mb-2">{{ service.title }}</h1>
              <div class="flex items-center mb-2">
                <div class="flex items-center text-amber-500 mr-2">
                  <Icon name="heroicons:star-solid" size="1rem" />
                  <span class="ml-1 text-gray-700">{{ service.rating }}</span>
                </div>
                <span class="text-gray-500 text-sm">({{ service.reviews }} 評價)</span>
              </div>
              <div class="flex items-center">
                <Icon name="heroicons:map-pin" class="text-teal-600 mr-1" size="1rem" />
                <span class="text-gray-700">{{ service.location }}</span>
                <span v-if="service.spot" class="text-gray-500 ml-1">({{ service.spot }})</span>
              </div>
            </div>
            <div class="text-2xl font-bold text-teal-700">NT$ {{ service.price }}</div>
          </div>
          <div class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="(badge, index) in service.badges"
              :key="index"
              class="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded"
            >
              {{ badge }}
            </span>
          </div>
        </div>

        <!-- 服務詳情表格 -->
        <div class="p-6">
          <h2 class="text-xl font-semibold text-teal-700 mb-4">服務詳情</h2>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <tbody>
                <tr class="border-b border-gray-200">
                  <td class="py-3 px-4 bg-gray-50 font-medium text-gray-700 w-1/4">服務名稱</td>
                  <td class="py-3 px-4">{{ service.title }}</td>
                </tr>
                <tr class="border-b border-gray-200">
                  <td class="py-3 px-4 bg-gray-50 font-medium text-gray-700">服務類型</td>
                  <td class="py-3 px-4">{{ service.tag }}</td>
                </tr>
                <tr class="border-b border-gray-200">
                  <td class="py-3 px-4 bg-gray-50 font-medium text-gray-700">地區</td>
                  <td class="py-3 px-4">{{ getRegionName(service.region) }} - {{ service.location }}</td>
                </tr>
                <tr class="border-b border-gray-200">
                  <td class="py-3 px-4 bg-gray-50 font-medium text-gray-700">潛點</td>
                  <td class="py-3 px-4">{{ service.spot || '未指定' }}</td>
                </tr>
                <tr class="border-b border-gray-200">
                  <td class="py-3 px-4 bg-gray-50 font-medium text-gray-700">價格</td>
                  <td class="py-3 px-4">NT$ {{ service.price }}</td>
                </tr>
                <tr class="border-b border-gray-200">
                  <td class="py-3 px-4 bg-gray-50 font-medium text-gray-700">評分</td>
                  <td class="py-3 px-4">
                    <div class="flex items-center">
                      <div class="flex text-amber-500">
                        <Icon 
                          v-for="i in 5" 
                          :key="i"
                          :name="i <= Math.floor(service.rating) ? 'heroicons:star-solid' : (i - 0.5 <= service.rating ? 'heroicons:star-half' : 'heroicons:star')"
                          size="1rem"
                          class="mr-0.5"
                        />
                      </div>
                      <span class="ml-2">{{ service.rating }} ({{ service.reviews }} 評價)</span>
                    </div>
                  </td>
                </tr>
                <tr class="border-b border-gray-200">
                  <td class="py-3 px-4 bg-gray-50 font-medium text-gray-700">包含服務</td>
                  <td class="py-3 px-4">
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="(badge, index) in service.badges"
                        :key="index"
                        class="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded"
                      >
                        {{ badge }}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="py-3 px-4 bg-gray-50 font-medium text-gray-700">服務描述</td>
                  <td class="py-3 px-4 whitespace-pre-line">{{ service.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 預約按鈕 -->
        <div class="p-6 bg-gray-50 border-t border-gray-200">
          <button
            class="w-full py-3 bg-teal-600 text-white rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors"
          >
            <Icon name="heroicons:calendar" class="mr-2" size="1.25rem" />
            立即預約
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 狀態
const service = ref(null);
const loading = ref(true);
const error = ref(null);

// 地區名稱映射
const regionNames = {
  north: "北部",
  east: "東部",
  south: "南部",
  islands: "離島",
};

// 獲取地區名稱
const getRegionName = (regionId) => {
  return regionNames[regionId] || regionId;
};

// 獲取服務詳情
async function fetchServiceDetails() {
  loading.value = true;
  error.value = null;

  try {
    const serviceId = route.params.id;
    const { $supabase } = useNuxtApp();

    // 從 Supabase 獲取服務詳情
    const { data, error: supabaseError } = await $supabase
      .from("services")
      .select("*")
      .eq("id", serviceId)
      .single();

    if (supabaseError) {
      throw supabaseError;
    }

    service.value = data;
    console.log("服務詳情:", service.value);
  } catch (err) {
    console.error("獲取服務詳情時出錯:", err);
    error.value = `獲取服務詳情時出錯: ${err.message || "未知錯誤"}`;
  } finally {
    loading.value = false;
  }
}

// 生命週期鉤子
onMounted(() => {
  fetchServiceDetails();
});
</script>
