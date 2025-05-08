<template>
  <div class="waves-container">
    <div
      v-for="(wave, index) in waves"
      :key="index"
      :class="[`wave`, `wave${index + 1}`]"
      :style="{ transform: `translateY(${waveOffsets[index]}px)` }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// 定義 props
const props = defineProps({
  scrollY: {
    type: Number,
    default: 0
  }
});

// 波浪元素與位移計算
const waves = [1, 2, 3, 4, 5]; // 5個波浪元素
const waveOffsets = computed(() => [
  props.scrollY * 0.03, // wave1
  props.scrollY * 0.05, // wave2
  props.scrollY * 0.07, // wave3
  props.scrollY * 0.09, // wave4
  props.scrollY * 0.1, // wave5
]);
</script>

<style scoped>
@keyframes wave-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 2000px 0;
  }
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
 
</style>
