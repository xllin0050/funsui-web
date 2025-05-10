<template>
  <!-- 頁尾 Footer -->
  <footer id="contact" class="bg-[color:var(--color-poseidon-950)] text-white py-8 mt-10">
    <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <div class="mb-4 md:mb-0">
        <span class="font-bold text-lg">Funsui</span> &copy; {{ new Date().getFullYear() }}
      </div>
      <div class="flex space-x-4 mb-4 md:mb-0">
        <a href="#" class="hover:text-[color:var(--color-poseidon-400)]">Facebook</a>
        <a href="#" class="hover:text-[color:var(--color-poseidon-400)]">Instagram</a>
        <a href="#" class="hover:text-[color:var(--color-poseidon-400)]">LINE</a>
      </div>
      <div>
        <a href="mailto:service@funsui.com" class="hover:underline">service@funsui.com</a>
      </div>
    </div>
  </footer>
</template>
