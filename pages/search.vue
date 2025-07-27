<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-poseidon-700 mb-6">搜尋結果</h1>
    
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-poseidon-500"></div>
      <p class="mt-2 text-gray-600">搜尋中...</p>
    </div>
    
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <strong>錯誤!</strong> <span>{{ error }}</span>
    </div>
    
    <div v-else>
      <div v-if="services.length === 0" class="text-center py-8">
        <p class="text-gray-600">沒有找到符合條件的服務。</p>
      </div>
      
      <div v-else>
        <p class="text-gray-600 mb-4">找到 {{ services.length }} 個結果</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="service in services" 
            :key="service.id"
            class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-semibold text-gray-900">{{ service.name }}</h3>
                <span 
                  v-if="service.type"
                  class="bg-poseidon-100 text-poseidon-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {{ service.type }}
                </span>
              </div>
              
              <div class="flex items-center text-gray-600 mb-2">
                <Icon name="heroicons:map-pin" class="mr-1" size="1rem" />
                <span>{{ service.location || service.region }}</span>
              </div>
              
              <div class="flex items-center text-gray-600 mb-3">
                <Icon name="heroicons:currency-dollar" class="mr-1" size="1rem" />
                <span class="font-semibold text-lg">NT$ {{ service.price }}</span>
              </div>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-if="service.experience_level"
                  class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {{ getExperienceLabel(service.experience_level) }}
                </span>
                <span 
                  v-for="lang in service.languages" 
                  :key="lang"
                  class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {{ getLanguageLabel(lang) }}
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <button 
                  class="text-poseidon-600 hover:text-poseidon-800 font-medium flex items-center"
                  @click="viewDetails(service)"
                >
                  詳細資訊
                  <Icon name="heroicons:arrow-right" class="ml-1" size="1rem" />
                </button>
                <button 
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isFavorite(service.id)
                      ? 'bg-gray-500 text-white cursor-not-allowed'
                      : 'bg-poseidon-500 hover:bg-poseidon-600 text-white'
                  ]"
                  :disabled="isFavorite(service.id)"
                  @click="addToFavorites(service)"
                >
                  {{ isFavorite(service.id) ? '已收藏' : '收藏' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 服務詳情 Modal -->
    <Modal :visible="showDetailModal" @close="closeDetailModal">
      <template #header>
        <h3 v-if="selectedService">{{ selectedService.name }}</h3>
      </template>
      <template #body>
        <div v-if="selectedService" class="space-y-4">
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-24">服務名稱：</span>
            <span>{{ selectedService.name }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-24">類型：</span>
            <span>{{ selectedService.type }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-24">地區：</span>
            <span>{{ selectedService.location || selectedService.region }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-24">價格：</span>
            <span class="font-semibold">NT$ {{ selectedService.price }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-24">經驗要求：</span>
            <span>{{ getExperienceLabel(selectedService.experience_level) }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-700 w-24">語言能力：</span>
            <div class="flex flex-wrap gap-2 mt-1">
              <span 
                v-for="lang in selectedService.languages" 
                :key="lang"
                class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {{ getLanguageLabel(lang) }}
              </span>
            </div>
          </div>
          <div class="pt-4">
            <p class="text-gray-600">{{ selectedService.description || '這是一個很棒的潛水服務，提供專業的指導和安全的環境。' }}</p>
          </div>
        </div>
      </template>
      <template #footer>
        <button 
          class="bg-poseidon-500 hover:bg-poseidon-600 text-white font-semibold py-2 px-4 rounded"
          @click="closeDetailModal"
        >
          關閉
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useServices } from '~/composables/useServices'
import { useFavoritesStore } from '~/stores/favorites'
import Modal from '~/components/Modal.vue'

const route = useRoute()
const { searchServices, services, loading, error } = useServices()
const favoritesStore = useFavoritesStore()
const { isFavorite } = favoritesStore;

// Modal 狀態
const showDetailModal = ref(false)
const selectedService = ref(null)

// 經驗等級標籤映射
const experienceLabels = {
  beginner: '初學者',
  intermediate: '中級',
  advanced: '進階',
  professional: '專業'
}

// 語言標籤映射
const languageLabels = {
  zh_tw: '中文',
  en: '英文',
  jp: '日文',
  kr: '韓文'
}

const getExperienceLabel = (level) => {
  return experienceLabels[level] || level
}

const getLanguageLabel = (lang) => {
  return languageLabels[lang] || lang
}

const viewDetails = (service) => {
  selectedService.value = service
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedService.value = null
}

const addToFavorites = (service) => {
  const added = favoritesStore.addFavorite(service);
  if (added) {
    alert(`${service.name} 已添加到收藏!`);
  } else {
    alert(`${service.name} 已在收藏中!`);
  }
}

// 根據查詢參數搜尋服務
onMounted(async () => {
  const filters = {}
  
  // 從查詢參數構建過濾器
  if (route.query.q) filters.q = route.query.q
  if (route.query.type) filters.type = route.query.type
  if (route.query.region) filters.region = route.query.region
  if (route.query.price) filters.price = route.query.price
  if (route.query.exp) filters.exp = route.query.exp
  if (route.query.lang) filters.lang = route.query.lang
  
  await searchServices(filters)
})
</script>

<style scoped>
/* 可以添加自定義樣式 */
</style>
