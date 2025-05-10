<template>
  <div class="service-search-container bg-sky-50 p-6 rounded-lg shadow-sm">
    <h2 class="text-2xl font-bold text-cyan-700 mb-6">尋找潛水服務</h2>
    
    <!-- 搜索框 -->
    <div class="search-box relative mb-6">
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="搜尋潛水服務、地點或教練..." 
        class="w-full py-3 px-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Icon name="heroicons:magnifying-glass" size="1.25rem" />
      </div>
    </div>
    
    <!-- 進階篩選 -->
    <div class="filter-section mb-6">
      <div class="filter-header flex items-center justify-between mb-4" @click="toggleAdvancedFilter">
        <div class="flex items-center">
          <Icon name="heroicons:exclamation-triangle" class="text-amber-500 mr-2" size="1.25rem" />
          <span class="font-semibold">進階篩選</span>
        </div>
        <Icon 
          :name="isAdvancedFilterOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" 
          class="text-gray-600" 
          size="1.25rem" 
        />
      </div>
      
      <!-- 進階篩選選項 -->
      <div v-if="isAdvancedFilterOpen" class="filter-options space-y-6">
        <!-- 服務類型 -->
        <div class="filter-group">
          <label class="block text-gray-700 mb-2">服務類型</label>
          <div class="relative">
            <select 
              v-model="selectedServiceType" 
              class="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="" disabled>選擇服務類型</option>
              <option v-for="type in serviceTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
            </select>
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Icon name="heroicons:chevron-down" class="text-gray-600" size="1.25rem" />
            </div>
          </div>
        </div>
        
        <!-- 地區 -->
        <div class="filter-group">
          <label class="block text-gray-700 mb-2">地區</label>
          <div class="relative">
            <select 
              v-model="selectedRegion" 
              class="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="" disabled>選擇地區</option>
              <option v-for="region in regions" :key="region.id" :value="region.id">{{ region.name }}</option>
            </select>
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Icon name="heroicons:chevron-down" class="text-gray-600" size="1.25rem" />
            </div>
          </div>
        </div>
        
        <!-- 價格範圍 -->
        <div class="filter-group">
          <label class="block text-gray-700 mb-2">價格範圍 (NT$)</label>
          <div class="price-slider">
            <input 
              v-model="priceRange"
              type="range" 
              min="1000" 
              max="10000" 
              step="100"
              class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <div class="flex justify-between mt-2 text-gray-600">
              <span>NT$ 1000</span>
              <span>NT$ 10000</span>
            </div>
          </div>
        </div>
        
        <!-- 經驗要求 -->
        <div class="filter-group">
          <label class="block text-gray-700 mb-2">經驗要求</label>
          <div class="relative">
            <select 
              v-model="selectedExperience" 
              class="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="" disabled>選擇經驗等級</option>
              <option v-for="exp in experienceLevels" :key="exp.id" :value="exp.id">{{ exp.name }}</option>
            </select>
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Icon name="heroicons:chevron-down" class="text-gray-600" size="1.25rem" />
            </div>
          </div>
        </div>
        
        <!-- 語言能力 -->
        <div class="filter-group">
          <label class="block text-gray-700 mb-2">語言能力</label>
          <div class="relative">
            <select 
              v-model="selectedLanguage" 
              class="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="" disabled>選擇語言</option>
              <option v-for="lang in languages" :key="lang.id" :value="lang.id">{{ lang.name }}</option>
            </select>
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Icon name="heroicons:chevron-down" class="text-gray-600" size="1.25rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 搜尋按鈕 -->
    <button 
      class="w-full py-3 bg-cyan-700 text-white rounded-lg flex items-center justify-center hover:bg-cyan-800 transition-colors"
      @click="searchServices" 
    >
      <Icon name="heroicons:magnifying-glass" class="mr-2" size="1.25rem" />
      搜尋
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 狀態管理
const searchQuery = ref('');
const isAdvancedFilterOpen = ref(false);
const selectedServiceType = ref('');
const selectedRegion = ref('');
const priceRange = ref(5000);
const selectedExperience = ref('');
const selectedLanguage = ref('');

// 服務類型數據
const serviceTypes = [
  { id: '潛水課程', name: '潛水課程' },
  { id: '導潛服務', name: '導潛服務' },
  { id: '裝備租賃', name: '裝備租賃' },
  { id: '團體旅遊', name: '團體旅遊' },
];

// 地區數據
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

// 方法
const toggleAdvancedFilter = () => {
  isAdvancedFilterOpen.value = !isAdvancedFilterOpen.value;
};

// 搜索服務並導航到搜索結果頁面
const searchServices = () => {
  // 構建搜索參數
  const params = {};
  
  // 只添加非空的參數
  if (searchQuery.value) params.q = searchQuery.value;
  if (selectedServiceType.value) params.type = selectedServiceType.value;
  if (selectedRegion.value) params.region = selectedRegion.value;
  if (priceRange.value) params.price = priceRange.value;
  if (selectedExperience.value) params.exp = selectedExperience.value;
  if (selectedLanguage.value) params.lang = selectedLanguage.value;
  
  // 在控制台輸出搜索參數
  console.log('搜索參數:', params);
  
  // 觸發搜索事件，讓父組件知道
  emit('search', params);
  
  // 導航到搜索結果頁面，帶上查詢參數
  router.push({ path: '/search', query: params });
};

// 定義組件事件
const emit = defineEmits(['search']);
</script>

<style scoped>
/* 自定義滑塊樣式 */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 5px;
  background: #e2e8f0;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #0e7490; /* Cyan-700 */
  cursor: pointer;
  transition: background 0.15s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #155e75; /* Cyan-800 */
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 50%;
  background: #0e7490;
  cursor: pointer;
  transition: background 0.15s ease-in-out;
}

input[type="range"]::-moz-range-thumb:hover {
  background: #155e75;
}

/* 下拉選單自定義樣式 */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
