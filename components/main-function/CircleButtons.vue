<template>
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
      <div class="tooltip-popover" :class="{ active: activeTooltips[index] }">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-content">{{ circle.tooltip }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  activeComponent: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:activeComponent"]);

// 圓形按鈕相關變數
const circles = [
  { component: "search", icon: "heroicons:magnifying-glass", tooltip: "搜尋潛水服務" },
  { component: "location", icon: "heroicons:map-pin", tooltip: "熱門潛水地點" },
  { component: "map", icon: "heroicons:map", tooltip: "台灣潛水地圖" },
];

// 提示框相關變數
const activeTooltips = ref([false, false, false]);

// 顯示提示框
const showTooltip = (index, _event) => {
  if (props.activeComponent === circles[index].component) return;
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
  if (props.activeComponent === component) {
    closeActiveComponent();
  } else {
    emit("update:activeComponent", component);
  }
};

// 關閉當前激活的組件
const closeActiveComponent = () => {
  emit("update:activeComponent", null);
};

// 圓形容器參考
const circlesContainerRef = ref(null);

// 向父組件暴露容器引用和關閉方法
defineExpose({
  circlesContainerRef,
  closeActiveComponent,
});
</script>

<style scoped>
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
</style>
