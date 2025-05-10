<template>
  <div class="relative min-h-[350px] overflow-hidden">
    <div class="absolute inset-0 w-full h-full">
      <WavesSVG />
    </div>

    <div class="main-section">
      <CircleButtons
        ref="circleButtonsRef"
        :active-component="activeComponent"
        @update:active-component="activeComponent = $event"
      />
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import CircleButtons from "~/components/main-function/CircleButtons.vue";
import PanelComponent from "~/components/main-function/PanelComponent.vue";
import LocationSelect from "~/components/main-function/LocationSelect.vue";
import TaiwanMap from "~/components/main-function/TaiwanMap.vue";
import ServiceSearch from "~/components/main-function/ServiceSearch.vue";
import WavesSVG from "~/components/main-function/WavesSVG.vue";

const circleButtonsRef = ref(null);
const activeComponent = ref(null);

const closeActiveComponent = () => {
  activeComponent.value = null;
  if (circleButtonsRef.value?.closeActiveComponent) {
    circleButtonsRef.value.closeActiveComponent();
  }
};
</script>

<style scoped>
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
</style>
