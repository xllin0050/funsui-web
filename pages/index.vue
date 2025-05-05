<template>
  <!-- Funsui 首頁主結構 -->
  <div class="font-sans bg-poseidon-50 min-h-screen">
    <!-- 主要內容區域 -->
    <div class="main-content-area relative overflow-hidden">
      <!-- 波浪背景 -->
      <div class="waves-container">
        <div class="wave wave1" :style="{ transform: `translateY(${wave1Offset}px)` }"></div>
        <div class="wave wave2" :style="{ transform: `translateY(${wave2Offset}px)` }"></div>
        <div class="wave wave3" :style="{ transform: `translateY(${wave3Offset}px)` }"></div>
        <div class="wave wave4" :style="{ transform: `translateY(${wave3Offset * 1.2}px)` }"></div>
        <div class="wave wave5" :style="{ transform: `translateY(${wave2Offset * 1.5}px)` }"></div>
      </div>

      <!-- 頁首 (移動到波浪內區域) -->
      <PageHeader class="relative z-30" />

      <!-- 主要內容 -->
      <main class="main-section relative pt-20">
        <!-- 圓形按鈕 -->
        <div
          ref="circlesContainerRef"
          class="circles-container"
          :class="{ aligned: activeComponent !== null }"
        >
          <div
            v-for="(circle, index) in circles"
            :key="index"
            class="circle-button"
            :class="{ active: activeComponent === circle.component }"
            :style="getCircleStyle(index)"
            @click="toggleComponent(circle.component)"
          >
            <div class="inner-circle">
              <Icon :name="circle.icon" size="1.5rem" class="text-white" />
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- 組件容器 (main 區塊中的定位容器) -->
    <div v-if="activeComponent" class="component-overlay" @click="closeActiveComponent">
      <div class="centered-components" @click.stop>
        <!-- 搜索組件 -->
        <div v-if="activeComponent === 'search'" class="component-panel" @click.stop>
          <div class="component-inner">
            <ServiceSearch @search="handleSearch" />
          </div>
        </div>

        <!-- 地點選擇組件 -->
        <div v-if="activeComponent === 'location'" class="component-panel" @click.stop>
          <div class="component-inner">
            <LocationSelect @select-location="handleLocationSelect" />
          </div>
        </div>

        <!-- 地圖組件 -->
        <div v-if="activeComponent === 'map'" class="component-panel" @click.stop>
          <div class="component-inner">
            <TaiwanMap @region-selected="handleRegionSelected" />
          </div>
        </div>
      </div>
    </div>

    <!-- 推薦潛水地點 -->
    <LocationCards />
    <!-- CTA 區塊 -->
    <CTASection />
    <!-- 頁尾 -->
    <PageFooter />
  </div>
</template>

<script setup>
// 匯入所有首頁元件
import PageHeader from "@/components/PageHeader.vue";
import ServiceSearch from "@/components/ServiceSearch.vue";
import LocationSelect from "@/components/LocationSelect.vue";
import TaiwanMap from "@/components/TaiwanMap.vue";
import LocationCards from "@/components/LocationCards.vue";
import CTASection from "@/components/CTASection.vue";
import PageFooter from "@/components/PageFooter.vue";

import { ref, onMounted, onUnmounted, computed } from "vue";

// 服務數據
const services = ref([]);

// 視差效果相關變數
const scrollY = ref(0);
const wave1Offset = computed(() => scrollY.value * 0.1);
const wave2Offset = computed(() => scrollY.value * 0.2);
const wave3Offset = computed(() => scrollY.value * 0.3);

// 圓形按鈕相關變數
const activeComponent = ref(null);
const circles = [
  { component: "search", icon: "heroicons:magnifying-glass" },
  { component: "location", icon: "heroicons:map-pin" },
  { component: "map", icon: "heroicons:map" },
];

// 圓形位置計算
const getRandomPosition = () => {
  return {
    top: Math.floor(Math.random() * 60) + 20 + "%",
    left: Math.floor(Math.random() * 60) + 20 + "%",
  };
};

// 圓形位置
const circlePositions = ref(circles.map(() => getRandomPosition()));

// 獲取圓形樣式
const getCircleStyle = index => {
  if (activeComponent.value === null) {
    return circlePositions.value[index];
  } else {
    // 當有組件激活時，圓形按鈕排列在頂部
    return {
      top: `${10 + index * 5}%`,
      left: `${30 + index * 20}%`,
    };
  }
};

// 切換組件顯示
const toggleComponent = component => {
  if (activeComponent.value === component) {
    closeActiveComponent();
  } else {
    activeComponent.value = component;
    // 滾動到頁面頂部
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

// 關閉當前激活的組件
const closeActiveComponent = () => {
  activeComponent.value = null;
  // 重新隨機排列圓形
  circlePositions.value = circles.map(() => getRandomPosition());
};

// 處理搜索事件
const handleSearch = params => {
  console.log("搜索參數:", params);
  // 這裡可以進行搜索相關操作
};

// 處理地點選擇事件
const handleLocationSelect = location => {
  console.log("選擇地點:", location);
  // 這裡可以進行地點選擇相關操作
};

// 處理地區選擇事件
const handleRegionSelected = region => {
  console.log("選擇地區:", region);
  // 這裡可以進行地區選擇相關操作
};

// 圓形容器參考
const circlesContainerRef = ref(null);

// 處理滾動事件
const handleScroll = () => {
  scrollY.value = window.scrollY;

  // 檢查 main 區塊是否在可見範圍內
  const mainArea = document.querySelector(".main-section");
  if (mainArea && circlesContainerRef.value) {
    const rect = mainArea.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      // 如果 main 區塊不可見，關閉激活的組件
      if (activeComponent.value) {
        closeActiveComponent();
      }
    }
  }
};

// 獲取服務數據
async function getServices() {
  // 使用插件提供的 Supabase 客戶端
  const { $supabase } = useNuxtApp();

  const { data, error } = await $supabase.from("services").select("*");

  if (error) {
    console.error(error);
  } else {
    services.value = data.length ? data : [];
    console.log("已載入服務數據:", services);
  }
}

onMounted(() => {
  getServices();
  window.addEventListener("scroll", handleScroll);
  // 初始化隨機圓形位置
  circlePositions.value = circles.map(() => getRandomPosition());
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* 主內容區域 */
.main-content-area {
  min-height: 600px;
  position: relative;
}

.main-section {
  min-height: 500px;
  padding-top: 120px;
}

/* 波浪背景 */
.waves-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 600px; /* 增加波浪比例 */
  overflow: hidden;
  z-index: 0;
}

.wave {
  position: absolute;
  width: 100%;
  height: 450px;
  background-repeat: repeat-x;
  background-size: 2000px 400px;
  opacity: 0.85;
}

.wave1 {
  top: 0;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 150" xmlns="http://www.w3.org/2000/svg"><path d="M0,75 C200,150 400,0 600,75 C800,150 1000,0 1200,75 L1200,0 L0,0 Z" fill="%230891b2" opacity="0.6"/></svg>');
  z-index: 5;
  animation: wave-move 20s linear infinite;
}

.wave2 {
  top: 50px;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 180" xmlns="http://www.w3.org/2000/svg"><path d="M0,90 C200,0 400,180 600,90 C800,0 1000,180 1200,90 L1200,0 C1000,35 800,12 600,36 C400,12 200,35 0,0 Z" fill="%230e7490" opacity="0.7"/></svg>');
  z-index: 4;
  animation: wave-move 15s linear infinite reverse;
}

.wave3 {
  top: 130px;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 220" xmlns="http://www.w3.org/2000/svg"><path d="M0,110 C200,220 400,0 600,110 C800,220 1000,0 1200,110 L1200,0 C1050,60 900,22 600,37 C300,22 150,60 0,0 Z" fill="%23155e75" opacity="0.8"/></svg>');
  z-index: 3;
  animation: wave-move 18s linear infinite;
}

.wave4 {
  top: 150px;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1800 260" xmlns="http://www.w3.org/2000/svg"><path d="M0,130 C200,0 400,260 600,130 C1000,0 1400,260 1800,130 L1800,0 C1400,50 1000,20 600,70 C300,20 150,50 0,0 L0,130 Z" fill="%23164e63" opacity="0.85"/></svg>');
  z-index: 2;
  animation: wave-move 22s linear infinite reverse;
}

.wave5 {
  top: 90px;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 2000 300" xmlns="http://www.w3.org/2000/svg"><path d="M0,150 C200,300 400,50 800,150 C1200,240 1600,50 2000,150 L2000,300 L0,300 L0,150 Z" fill="%23083344" opacity="0.9"/></svg>');
  z-index: 1;
  animation: wave-move 25s linear infinite;
}

/* 圓形按鈕 */
.circles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  transition: all 0.5s ease;
  pointer-events: none;
}

.circle-button {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0891b2, #155e75);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;
  z-index: 10;
  pointer-events: auto;
}

.inner-circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.circle-button:hover .inner-circle {
  transform: scale(1.1);
}

.circle-button.active {
  transform: scale(1.2);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* 組件過度層 */
.component-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInOverlay 0.3s ease forwards;
}

@keyframes fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.centered-components {
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.component-panel {
  width: 400px;
  max-width: 90%;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.3s ease forwards;
  max-height: 80vh;
  overflow-y: auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes wave-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 2000px 0;
  }
}

.component-inner {
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  padding: 5px;
}

.from-left {
  left: 5%;
}

.from-right {
  right: 5%;
}
</style>
