<template>
  <!-- Funsui 首頁主結構 -->
  <div class="font-sans bg-poseidon-50 min-h-screen">
    <!-- 主要內容區域 -->
    <div class="main-content-area relative overflow-hidden">
      <!-- 波浪背景 -->
      <div class="waves-container">
        <div
          v-for="(wave, index) in waves"
          :key="index"
          :class="[`wave`, `wave${index + 1}`]"
          :style="{ transform: `translateY(${waveOffsets[index]}px)` }"
        ></div>
      </div>

      <!-- 頁首 (移動到波浪內區域) -->
      <PageHeader class="relative z-30" />

      <!-- 主要內容 -->
      <main class="main-section relative">
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
            @mouseenter="showTooltip(index, $event)"
            @mouseleave="hideTooltip(index)"
          >
            <div class="inner-circle">
              <Icon :name="circle.icon" size="1.5rem" class="text-white" />
            </div>
            <!-- 提示框 -->
            <div ref="tooltips" class="tooltip-popover" :class="{ active: activeTooltips[index] }">
              <div class="tooltip-arrow"></div>
              <div class="tooltip-content">{{ circle.tooltip }}</div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- 組件容器 (main 區塊中的定位容器) -->
    <div v-if="activeComponent" class="component-overlay">
      <div class="centered-components">
        <!-- 搜索組件 -->
        <PanelComponent v-if="activeComponent === 'search'" @close="closeActiveComponent">
          <ServiceSearch />
        </PanelComponent>

        <!-- 地點選擇組件 -->
        <PanelComponent v-if="activeComponent === 'location'" @close="closeActiveComponent">
          <LocationSelect />
        </PanelComponent>

        <!-- 地圖組件 -->
        <PanelComponent v-if="activeComponent === 'map'" @close="closeActiveComponent">
          <TaiwanMap />
        </PanelComponent>
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
import PanelComponent from "@/components/PanelComponent.vue";

import { ref, onMounted, onUnmounted, computed } from "vue";

// const { $anime, $animeUtils } = useNuxtApp();

// 視差效果相關變數
const scrollY = ref(0);

// 波浪元素與位移計算
const waves = [1, 2, 3, 4, 5]; // 5個波浪元素
const waveOffsets = computed(() => [
  scrollY.value * 0.03, // wave1
  scrollY.value * 0.05, // wave2
  scrollY.value * 0.07, // wave3
  scrollY.value * 0.09, // wave4
  scrollY.value * 0.1, // wave5
]);

// 圓形按鈕相關變數
const activeComponent = ref(null);
const circles = [
  { component: "search", icon: "heroicons:magnifying-glass", tooltip: "搜尋潛水服務" },
  { component: "location", icon: "heroicons:map-pin", tooltip: "熱門潛水地點" },
  { component: "map", icon: "heroicons:map", tooltip: "台灣潛水地圖" },
];

// 提示框相關變數

const activeTooltips = ref([false, false, false]);

// 顯示提示框

const showTooltip = (index, _event) => {
  if (activeComponent.value === circles[index].component) return;
  activeTooltips.value[index] = true;
};

// 隱藏提示框
const hideTooltip = index => {
  activeTooltips.value[index] = false;
};

// 獲取圓形樣式
const getCircleStyle = index => {
  // 水平置中排列按鈕
  return {
    top: "50%",
    left: `${(index + 1) * 25}%`,
    transform: "translate(-50%, -50%)",
  };
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
  // 圓形按鈕會自動恢復原排列
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

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  // 確保頁面載入時滾動位置在頂部
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* 主內容區域 */
.main-content-area {
  height: 500px;
  min-height: 500px;
  position: relative;
}

.main-section {
  min-height: 425px;
  /* padding-top: 120px; */
}

/* 波浪背景 */
.waves-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px; /* 增加波浪比例 */
  overflow: hidden;
  z-index: 0;
  background: linear-gradient(to bottom, var(--color-poseidon-200), var(--color-poseidon-300));
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
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 150" xmlns="http://www.w3.org/2000/svg"><path d="M0,75 C200,150 400,0 600,75 C800,150 1000,0 1200,75 L1200,0 L0,0 Z" fill="%231984d2" opacity="0.6"/></svg>');
  z-index: 1;
  animation: wave-move 20s linear infinite;
}

.wave2 {
  top: 65px;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 2100 270" xmlns="http://www.w3.org/2000/svg"><path d="M0,135 C300,0 600,270 900,135 C1200,0 1500,270 1800,135 C1950,210 2025,60 2100,135 L2100,0 C1950,52 1650,18 1350,54 C1050,30 750,67 450,22 C300,37 150,60 0,0 Z" fill="%23cae4f7" opacity="0.5"/></svg>');
  z-index: 2;
  animation: wave-move 15s linear infinite reverse;
}

.wave3 {
  top: 150px;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 2400 330" xmlns="http://www.w3.org/2000/svg"><path d="M0,165 C300,330 600,0 900,165 C1200,330 1500,0 1800,165 C2100,270 2250,90 2400,165 L2400,0 C2175,90 1950,33 1650,55 C1350,37 1050,60 750,33 C450,52 225,90 0,0 Z" fill="%23a0d1f3" opacity="0.4"/></svg>');
  z-index: 3;
  animation: wave-move 18s linear infinite;
}

.wave4 {
  top: 225px;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 2700 390" xmlns="http://www.w3.org/2000/svg"><path d="M0,195 C300,0 600,390 900,195 C1500,0 2100,390 2400,195 C2550,315 2625,120 2700,195 L2700,0 C2400,75 2100,30 1800,105 C1350,45 900,90 450,37 C300,52 150,67 0,0 L0,195 Z" fill="%236cb9ea" opacity="0.4"/></svg>');
  z-index: 2;
  animation: wave-move 22s linear infinite reverse;
}

.wave5 {
  top: 135px;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 3000 450" xmlns="http://www.w3.org/2000/svg"><path d="M0,225 C300,450 600,75 1200,225 C1800,360 2400,75 2700,225 C2850,330 2925,150 3000,225 L3000,450 L0,450 L0,225 Z" fill="%233ea0df" opacity="0.3"/></svg>');
  z-index: 1;
  animation: wave-move 25s linear infinite;
}

/* 圓形按鈕 */
.circles-container {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 20;
  transition: all 0.5s ease;
  pointer-events: none;
  display: flex;
  justify-content: center;
}

.circle-button {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--color-white);
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
  background: var(--color-poseidon-600);
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

/* 提示框樣式 */
.tooltip-popover {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0.75rem;
  margin-bottom: 12px;
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  color: #333;
  min-width: 120px;
  text-align: center;
  z-index: 20;
}

.tooltip-popover.active {
  opacity: 1;
}

.tooltip-arrow {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid white;
}

.tooltip-content {
  font-weight: 500;
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
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
  overflow: hidden;
}

.component-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #f1f8fe;
  border-bottom: 1px solid #e4f0fb;
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: rgba(202, 228, 247, 0.5);
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
