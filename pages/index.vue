<template>
  <!-- Funsui 首頁主結構 -->
  <div class="font-sans bg-poseidon-50 min-h-screen">
    <!-- 主要內容區域 -->
    <div class="main-content-area relative overflow-hidden">
      <!-- 波浪背景 -->
      <WavesBackground :scroll-y="scrollY" />
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
import PageHeader from "~/components/home/PageHeader.vue";
import ServiceSearch from "~/components/home/ServiceSearch.vue";
import LocationSelect from "~/components/home/LocationSelect.vue";
import TaiwanMap from "~/components/home/TaiwanMap.vue";
import LocationCards from "~/components/home/LocationCards.vue";
import CTASection from "~/components/home/CTASection.vue";
import PageFooter from "~/components/home/PageFooter.vue";
import PanelComponent from "~/components/home/PanelComponent.vue";
import WavesBackground from "~/components/home/WavesBackground.vue";

import { ref, onMounted, onUnmounted } from "vue";

// const { $anime, $animeUtils } = useNuxtApp();

// 視差效果相關變數
const scrollY = ref(0);

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
