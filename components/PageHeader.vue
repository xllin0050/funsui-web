<template>
  <!-- 頁首 Header，含 Logo、導覽列與 CTA 按鈕 -->
  <header class="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur shadow-sm">
    <nav class="container mx-auto flex items-center justify-between py-4 px-4">
      <!-- Logo -->
      <div class="text-2xl font-bold text-poseidon-700 tracking-wide">Funsui</div>
      <!-- 導覽列 -->
      <ul class="hidden md:flex space-x-8 text-poseidon-800 font-medium">
        <li><a href="#" class="hover:text-poseidon-500 transition">首頁</a></li>
        <li>
          <a href="#about" class="hover:text-poseidon-500 transition">關於我們</a>
        </li>
        <li>
          <a href="#locations" class="hover:text-poseidon-500 transition">潛水地點</a>
        </li>
        <li>
          <a href="#contact" class="hover:text-poseidon-500 transition">聯絡我們</a>
        </li>
      </ul>
      <!-- CTA 按鈕 -->
      <button
        class="ml-6 bg-poseidon-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-poseidon-600 transition hidden md:block"
      >
        立即搜尋
      </button>
      <!-- 手機選單（可擴充） -->
    </nav>
  </header>
</template>

<script setup>
// 頁首不需額外 JS
</script>

<style scoped>
/* 可自訂 header 陰影或透明度 */
</style>
