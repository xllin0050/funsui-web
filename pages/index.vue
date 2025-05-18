<template>
  <main class="bg-poseidon-50 min-h-screen font-sans">
    <MainFunction />
    <!-- 推薦潛水地點 -->
    <LocationCards />
    <!-- CTA 區塊 -->
    <CTASection v-if="!isAuthenticated" />
  </main>
</template>

<script setup>
// 匯入所有首頁元件
import LocationCards from '~/components/LocationCards.vue';
import CTASection from '~/components/CTASection.vue';
import MainFunction from '~/components/MainFunction.vue';

import { useAuthState } from '~/composables/useAuthState';

const { isAuthenticated } = useAuthState();
</script>

<style scoped></style>
