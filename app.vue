<template>
  <!-- Funsui 首頁主結構 -->
  <div class="font-sans bg-poseidon-50 min-h-screen">
    <!-- 頁首 -->
    <PageHeader />
    <main class="flex pt-20">
      <section id="search" class="w-full sm:w-1/3">
        <ServiceSearch />
        <RegionSelect />
      </section>
      <section id="map" class="hidden sm:block w-2/3">
        <TaiwanMap />
      </section>
    </main>
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
import RegionSelect from "@/components/RegionSelect.vue";
import TaiwanMap from "@/components/TaiwanMap.vue";
import LocationCards from "@/components/LocationCards.vue";
import CTASection from "@/components/CTASection.vue";
import PageFooter from "@/components/PageFooter.vue";

import { ref, onMounted } from "vue";

const services = ref([]);

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
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
