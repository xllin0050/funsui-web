<template>
  <!-- CTA 區塊：強調加入會員或開始搜尋 -->
  <section class="py-16 bg-poseidon-50">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-4 text-poseidon-700">立即加入 Funsui，探索更多潛水冒險！</h2>
      <p class="text-gray-600 mb-8">註冊會員即可收藏潛水地點、獲得最新活動資訊與專屬優惠。</p>
      <button class="bg-poseidon-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-poseidon-600 transition font-semibold text-lg" @click="routeTo('/register')">免費註冊</button>
    </div>
  </section>
</template>

<script setup>
async function routeTo (path) {
  await navigateTo(path);
}
</script>

<style scoped>
</style>
