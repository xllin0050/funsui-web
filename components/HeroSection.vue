<template>
  <!-- 英雄區：潛水美照背景、標語、搜尋欄位 -->
  <section class="relative h-[70vh] flex items-center justify-center bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80');">
    <div class="absolute inset-0 bg-black/40"></div>
    <div class="relative z-10 w-full text-center text-white flex flex-col items-center">
      <h1 class="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">探索世界最美的潛水地點</h1>
      <!-- 搜尋欄位 -->
      <div class="bg-white/90 rounded-xl shadow-lg flex flex-col md:flex-row gap-3 md:gap-0 items-center px-5 py-4 max-w-xl mx-auto mt-6">
        <input type="text" placeholder="輸入地點或關鍵字" class="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-poseidon-400)] text-gray-800" />
        <input type="date" class="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-poseidon-400)] text-gray-800 md:ml-2" />
        <button class="mt-3 md:mt-0 md:ml-4 bg-[color:var(--color-poseidon-500)] text-white px-6 py-2 rounded-full shadow hover:bg-[color:var(--color-poseidon-600)] transition font-semibold">搜尋</button>
      </div>
    </div>
  </section>
</template>

<script setup>
// 可於此加入搜尋互動邏輯
</script>

<style scoped>
</style>
