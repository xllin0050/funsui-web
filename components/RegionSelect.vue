<template>
  <div class="region-select-container bg-white p-6 rounded-lg shadow-sm mt-6">
    <h2 class="text-2xl font-bold text-teal-700 mb-6">熱門地區</h2>
    
    <div class="region-list space-y-4">
      <div 
        v-for="region in regions" 
        :key="region.id"
        class="region-item bg-sky-50 p-4 rounded-lg cursor-pointer hover:bg-sky-100 transition-colors"
        @click="selectRegion(region.id)"
      >
        <span class="text-lg font-medium text-teal-600">{{ region.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>

// 熱門地區數據
const regions = [
  { id: 'kenting', name: '墨丁' },
  { id: 'greenisland', name: '綠島' },
  { id: 'orchidisland', name: '蘭嶼' },
  { id: 'liuqiu', name: '小琉球' },
  { id: 'penghu', name: '澎湖' }
]

// 選擇地區事件
const emit = defineEmits(['select-region'])

const selectRegion = (regionId) => {
  console.log('選擇地區:', regionId)
  emit('select-region', regionId)
}
</script>

<style scoped>
.region-item {
  transition: transform 0.2s ease;
}

.region-item:hover {
  transform: translateY(-2px);
}
</style>
