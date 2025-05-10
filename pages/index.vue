<template>
  <main class="font-sans bg-poseidon-50 min-h-screen">
    <MainFunction />
    <!-- 推薦潛水地點 -->
    <LocationCards />
    <!-- CTA 區塊 -->
    <CTASection />
  </main>
</template>

<script setup>
// 匯入所有首頁元件
import LocationCards from "~/components/LocationCards.vue";
import CTASection from "~/components/CTASection.vue";
import MainFunction from "~/components/MainFunction.vue";

// const { $anime, $animeUtils } = useNuxtApp();
</script>

<style scoped></style>
