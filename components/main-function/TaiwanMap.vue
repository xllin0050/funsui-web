<template>
  <div class="taiwan-map-container bg-gray-50 p-6 rounded-lg shadow-sm h-full">
    <div class="map-header mb-4">
      <h2 class="text-2xl font-bold text-poseidon-700">探索台灣潛水地點</h2>
      <p class="text-poseidon-600 mt-1">點擊地圖上的地區，探索當地的潛水服務</p>
    </div>

    <div class="map-container relative bg-gray-50 rounded-lg" style="height: 500px">
      <!-- 台灣地圖背景圖片 -->
      <div class="taiwan-map-bg w-full h-full relative">
        <!-- 地區標記 -->
        <!-- 北部地區 -->
        <div
          class="region-marker absolute"
          :class="{ 'region-active': selectedRegion === 'north' }"
          style="top: 25%; left: 55%"
          @click="selectRegion('north')"
        >
          <div class="region-circle" :style="{ backgroundColor: getRegionColor('north') }">
            <div class="region-name">北部</div>
            <div class="region-count">{{ getServiceCount("north") }} 個服務</div>
          </div>
        </div>

        <!-- 東部地區 -->
        <div
          class="region-marker absolute"
          :class="{ 'region-active': selectedRegion === 'east' }"
          style="top: 50%; left: 75%"
          @click="selectRegion('east')"
        >
          <div class="region-circle" :style="{ backgroundColor: getRegionColor('east') }">
            <div class="region-name">東部</div>
            <div class="region-count">{{ getServiceCount("east") }} 個服務</div>
          </div>
        </div>

        <!-- 南部地區 -->
        <div
          class="region-marker absolute"
          :class="{ 'region-active': selectedRegion === 'south' }"
          style="top: 75%; left: 55%"
          @click="selectRegion('south')"
        >
          <div class="region-circle" :style="{ backgroundColor: getRegionColor('south') }">
            <div class="region-name">南部</div>
            <div class="region-count">{{ getServiceCount("south") }} 個服務</div>
          </div>
        </div>

        <!-- 離島地區 -->
        <div
          class="region-marker absolute"
          :class="{ 'region-active': selectedRegion === 'islands' }"
          style="top: 50%; left: 30%"
          @click="selectRegion('islands')"
        >
          <div class="region-circle" :style="{ backgroundColor: getRegionColor('islands') }">
            <div class="region-name">離島</div>
            <div class="region-count">{{ getServiceCount("islands") }} 個服務</div>
          </div>
        </div>
      </div>

      <!-- 地圖圖例 -->
      <div class="map-legend absolute top-4 left-4 bg-white p-2 rounded shadow-sm text-sm">
        <div class="flex items-center">
          <div class="w-4 h-4 rounded-full bg-poseidon-500 mr-2"></div>
          <span>點擊地圖上的點</span>
        </div>
        <div class="flex items-center mt-1">
          <div class="w-4 h-4 rounded-full bg-poseidon-700 mr-2"></div>
          <span>探索各地區的潛水服務</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

// 狀態管理
const selectedRegion = ref("");
const router = useRouter();

// 各地區的潛水服務數量
const serviceCounts = inject("servicesInRegion", ref([]));

// 地區對應的特色地點
// 該對應表可用於顯示特定地區的熱門地點
// 目前先註釋以避免 ESLint 警告
/*
const regionToHotspots = {
  north: ['keelung', 'taipei', 'newtaipei'],
  east: ['hualien', 'taitung', 'greenisland'],
  south: ['kaohsiung', 'pingtung', 'kenting'],
  islands: ['penghu', 'liuqiu', 'orchidisland']
}
*/

// 監聽選擇的地區變化
watch(selectedRegion, newRegion => {
  if (newRegion) {
    // 觸發地區選擇事件
    emit("region-selected", newRegion);
  }
});

// 方法
const selectRegion = region => {
  // 如果點擊已選擇的地區，則取消選擇
  if (selectedRegion.value === region) {
    selectedRegion.value = "";
  } else {
    selectedRegion.value = region;
  }
  console.log("選擇的地區:", region);
  // 觸發地區選擇事件
  emit("region-selected", region);
  // 導航到對應的地區頁面
  router.push(`/region/${region}`);
};

const getRegionColor = region => {
  return selectedRegion.value === region ? "#a0d1f3" : "#3ea0df";
};

const getServiceCount = region => {
  // 在數組中查找匹配的地區記錄
  const regionData = serviceCounts.value.find(item => item.region === region);
  // 如果找到匹配的地區，返回其數量，否則返回 0
  return regionData ? regionData.count : 0;
};

// 定義組件事件
const emit = defineEmits(["region-selected"]);

// 對外暴露方法
defineExpose({
  selectRegion,
});
</script>

<style scoped>
.taiwan-map-bg {
  background-image: url("/image/TW-EPS-01-0003.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.region-marker {
  transform: translate(-50%, -50%);
}

.region-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.region-circle:hover {
  transform: scale(1.05);
}

.region-name {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  pointer-events: none;
}

.region-count {
  font-size: 14px;
  color: #fff;
  pointer-events: none;
}

.region-active .region-circle {
  box-shadow: 0 0 0 4px #1a6bad;
}
</style>
