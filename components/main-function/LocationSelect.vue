<template>
  <div class="location-select-container bg-poseidon-50 p-6 rounded-lg shadow">
    <h2 class="text-2xl font-bold text-poseidon-600 mb-6">熱門地點</h2>

    <div v-if="isLoading" class="py-4 text-center text-gray-500">
      <p>正在載入熱門地點...</p>
    </div>

    <div v-else-if="popularLocations.length === 0" class="py-4 text-center text-gray-500">
      <p>暫無熱門地點數據</p>
    </div>

    <div v-else class="location-list space-y-4">
      <div
        v-for="(location, index) in popularLocations"
        :key="index"
        class="location-item p-4 rounded cursor-pointer bg-poseidon-200 hover:bg-poseidon-100 transition-colors"
        :class="getBackgroundClass(location.count)"
        @click="selectLocation(location.location)"
      >
        <div class="flex justify-between items-center">
          <span class="text-lg font-medium text-poseidon-600">{{ location.location }}</span>
          <span class="text-sm bg-white px-2 py-1 rounded-full text-poseidon-600"
            >{{ location.count }} 筆服務</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, computed } from "vue";
import { useRouter } from "vue-router";

// 從 app.vue 中注入熱門地點數據
const popularLocations = inject("popularLocations", ref([]));
const router = useRouter();

// 計算是否正在載入
const isLoading = computed(() => {
  return !Array.isArray(popularLocations.value);
});

// 根據數量設定背景顏色的函數
const getBackgroundClass = count => {
  if (count >= 10) return "bg-poseidon-200";
  if (count >= 5) return "bg-poseidon-100";
  return "bg-poseidon-50";
};

// 選擇地點事件
const emit = defineEmits(["select-location"]);

const selectLocation = location => {
  console.log("選擇地點:", location);
  emit("select-location", location);

  // 導航到對應的地點頁面（使用 /location 路由）
  router.push(`/location/${location}`);
};
</script>

<style scoped>
.location-item {
  transition: transform 0.2s ease;
}

.location-item:hover {
  transform: translateY(-2px);
}
</style>
