<template>
  <!-- Funsui 首頁主結構 -->
  <div class="font-sans bg-poseidon-50 min-h-screen">
    <!-- 頁首 -->
    <PageHeader />
    <main class="pt-20">
      <!-- 英雄區 -->
      <HeroSection />
      <!-- 推薦潛水地點 -->
      <LocationCards />
      <!-- CTA 區塊 -->
      <CTASection />
    </main>
    <!-- 頁尾 -->
    <PageFooter />
  </div>
</template>

<script setup>
// 匯入所有首頁元件
import PageHeader from "@/components/PageHeader.vue";
import HeroSection from "@/components/HeroSection.vue";
import LocationCards from "@/components/LocationCards.vue";
import CTASection from "@/components/CTASection.vue";
import PageFooter from "@/components/PageFooter.vue";
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
