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
        <CircleButtons
          ref="circleButtonsRef"
          :active-component="activeComponent"
          @update:active-component="activeComponent = $event"
        />
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
import CircleButtons from "~/components/home/CircleButtons.vue";

import { ref, onMounted, onUnmounted } from "vue";

// const { $anime, $animeUtils } = useNuxtApp();

// 視差效果相關變數
const scrollY = ref(0);

// 圓形按鈕相關變數
const activeComponent = ref(null);
const circleButtonsRef = ref(null);

// 監聽 activeComponent 變化，當設置為非 null 值時滾動到頁面頂部
watch(activeComponent, newValue => {
  if (newValue !== null) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

// 關閉當前激活的組件
const closeActiveComponent = () => {
  activeComponent.value = null;
  // 圓形按鈕會自動恢復原排列
};

// 處理滾動事件
const handleScroll = () => {
  scrollY.value = window.scrollY;

  // 檢查 main 區塊是否在可見範圍內
  const mainArea = document.querySelector(".main-section");
  if (mainArea && circleButtonsRef.value) {
    const rect = mainArea.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      // 如果 main 區塊不可見，關閉激活的組件
      if (activeComponent.value) {
        closeActiveComponent();
        // 調用 CircleButtons 組件內部的關閉方法來重置其狀態
        if (circleButtonsRef.value.closeActiveComponent) {
          circleButtonsRef.value.closeActiveComponent();
        }
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

/* 組件過度層 */
@keyframes fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

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
.centered-components {
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
