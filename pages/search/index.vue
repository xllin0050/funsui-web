<template>
  <div class="search-results-page bg-poseidon-50 min-h-screen p-6">
    <div class="container mx-auto">
      <!-- 返回首頁按鈕 -->
      <button
        class="mb-6 flex items-center text-teal-700 hover:text-teal-900 transition-colors"
        @click="router.push('/')"
      >
        <span class="mr-2">←</span> 返回首頁
      </button>

      <!-- 搜尋結果標題 -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-teal-800">搜尋結果</h1>
        <div class="text-gray-600">
          找到 <span class="font-semibold">{{ services.length }}</span> 個符合條件的服務
        </div>
      </div>

      <!-- 搜尋條件摘要 -->
      <div v-if="hasSearchParams" class="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 class="text-lg font-semibold text-teal-700 mb-2">搜尋條件</h2>
        <div class="flex flex-wrap gap-2">
          <div v-if="searchParams.query" class="bg-sky-100 px-3 py-1 rounded-full text-sm">
            關鍵字: {{ searchParams.query }}
          </div>
          <div v-if="searchParams.serviceType" class="bg-sky-100 px-3 py-1 rounded-full text-sm">
            服務類型: {{ getServiceTypeName(searchParams.serviceType) }}
          </div>
          <div v-if="searchParams.region" class="bg-sky-100 px-3 py-1 rounded-full text-sm">
            地區: {{ getRegionName(searchParams.region) }}
          </div>
          <div v-if="searchParams.price" class="bg-sky-100 px-3 py-1 rounded-full text-sm">
            價格上限: NT$ {{ searchParams.price }}
          </div>
          <div v-if="searchParams.experience" class="bg-sky-100 px-3 py-1 rounded-full text-sm">
            經驗要求: {{ getExperienceName(searchParams.experience) }}
          </div>
          <div v-if="searchParams.language" class="bg-sky-100 px-3 py-1 rounded-full text-sm">
            語言: {{ getLanguageName(searchParams.language) }}
          </div>
        </div>
      </div>

      <!-- 載入中提示 -->
      <div v-if="loading" class="bg-white rounded-lg shadow-md p-8 text-center">
        <p class="text-lg text-gray-600">正在搜尋潛水服務...</p>
      </div>

      <!-- 錯誤提示 -->
      <div v-else-if="error" class="bg-white rounded-lg shadow-md p-8 text-center">
        <p class="text-lg text-red-600">{{ error }}</p>
        <button
          class="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
          @click="searchServices"
        >
          重試
        </button>
      </div>

      <!-- 無數據提示 -->
      <div v-else-if="!services.length" class="bg-white rounded-lg shadow-md p-8 text-center">
        <p class="text-lg text-gray-600">
          沒有找到符合條件的潛水服務，請嘗試調整搜尋條件。
        </p>
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
              :alt="service.title"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-teal-100">
              <span class="text-teal-700">{{ service.title }}</span>
            </div>
            <div class="absolute top-2 right-2 bg-teal-600 text-white px-2 py-1 rounded text-sm">
              {{ service.tag }}
            </div>
          </div>
          <div class="p-4">
            <div class="flex items-center mb-2">
              <div class="flex items-center text-amber-500 mr-2">
                <Icon name="heroicons:star-solid" size="1rem" />
                <span class="ml-1 text-gray-700">{{ service.rating }}</span>
              </div>
              <span class="text-gray-500 text-sm">({{ service.reviews }} 評價)</span>
            </div>
            <h3 class="text-xl font-semibold text-teal-800 mb-2">{{ service.title }}</h3>
            <div class="flex items-center mb-2">
              <Icon name="heroicons:map-pin" class="text-teal-600 mr-1" size="1rem" />
              <span class="text-gray-700">{{ service.location }}</span>
              <span v-if="service.spot" class="text-gray-500 ml-1">({{ service.spot }})</span>
            </div>
            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="(badge, index) in service.badges"
                :key="index"
                class="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded"
              >
                {{ badge }}
              </span>
            </div>
            <p class="text-gray-600 mb-3 line-clamp-2">{{ service.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-teal-700 font-medium">NT$ {{ service.price }}</span>
              <button
                class="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 transition-colors"
                @click="viewServiceDetails(service.id)"
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
const searchParams = ref({});

// 參考數據
const serviceTypes = [
  { id: 'diving_lesson', name: '潛水課程' },
  { id: 'guided_dive', name: '導潛服務' },
  { id: 'equipment_rental', name: '裝備租賃' },
  { id: 'diving_trip', name: '潛水旅行' },
];

const regions = [
  { id: 'north', name: '北部' },
  { id: 'east', name: '東部' },
  { id: 'south', name: '南部' },
  { id: 'islands', name: '離島' },
];

const experienceLevels = [
  { id: 'beginner', name: '初學者' },
  { id: 'intermediate', name: '中級' },
  { id: 'advanced', name: '進階' },
  { id: 'professional', name: '專業' },
];

const languages = [
  { id: 'zh_tw', name: '中文' },
  { id: 'en', name: '英文' },
  { id: 'jp', name: '日文' },
  { id: 'kr', name: '韓文' },
];

// 計算屬性
const hasSearchParams = computed(() => {
  return Object.values(searchParams.value).some(value => value);
});

// 輔助函數
const getServiceTypeName = (id) => {
  const type = serviceTypes.find(t => t.id === id);
  return type ? type.name : id;
};

const getRegionName = (id) => {
  const region = regions.find(r => r.id === id);
  return region ? region.name : id;
};

const getExperienceName = (id) => {
  const exp = experienceLevels.find(e => e.id === id);
  return exp ? exp.name : id;
};

const getLanguageName = (id) => {
  const lang = languages.find(l => l.id === id);
  return lang ? lang.name : id;
};

// 查看服務詳情
const viewServiceDetails = (serviceId) => {
  router.push(`/service/${serviceId}`);
};

// 搜尋服務
async function searchServices() {
  loading.value = true;
  error.value = null;

  try {
    // 從 URL 查詢參數獲取搜尋條件
    const query = route.query.q || '';
    const serviceType = route.query.type || '';
    const region = route.query.region || '';
    const price = route.query.price ? parseInt(route.query.price) : null;
    const experience = route.query.exp || '';
    const language = route.query.lang || '';

    // 更新搜尋參數
    searchParams.value = {
      query,
      serviceType,
      region,
      price,
      experience,
      language
    };

    const { $supabase } = useNuxtApp();
    
    // 構建 Supabase 查詢
    let query_builder = $supabase.from('services').select('*');
    
    // 添加過濾條件
    if (query) {
      query_builder = query_builder.or(`title.ilike.%${query}%,description.ilike.%${query}%,location.ilike.%${query}%`);
    }
    
    if (serviceType) {
      query_builder = query_builder.eq('tag', serviceType);
    }
    
    if (region) {
      query_builder = query_builder.eq('region', region);
    }
    
    if (price) {
      query_builder = query_builder.lte('price', price);
    }
    
    // 執行查詢
    const { data, error: supabaseError } = await query_builder;

    if (supabaseError) {
      throw supabaseError;
    }

    services.value = data || [];
    console.log('搜尋結果:', services.value);
  } catch (err) {
    console.error('搜尋服務時出錯:', err);
    error.value = `搜尋服務時出錯: ${err.message || '未知錯誤'}`;
  } finally {
    loading.value = false;
  }
}

// 生命週期鉤子
onMounted(() => {
  searchServices();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
}
</style>
