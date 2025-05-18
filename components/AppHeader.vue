<template>
  <!-- 頁首 Header，含 Logo、導覽列與 CTA 按鈕 -->
  <header
    class="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur"
    v-bind="$attrs"
  >
    <nav class="container mx-auto flex items-center justify-between px-4 py-4">
      <!-- Logo -->
      <div class="text-poseidon-700 text-2xl font-bold tracking-wide">Funsui</div>
      <!-- 導覽列 -->
      <ul class="text-poseidon-800 hidden space-x-8 font-medium md:flex">
        <li v-for="link in links" :key="link.href">
          <NuxtLink :to="link.href" class="hover:text-poseidon-500 transition">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
      <!-- CTA 按鈕 -->
      <button
        class="bg-poseidon-500 hover:bg-poseidon-600 ml-6 hidden rounded-full px-5 py-2 text-white shadow-md transition md:block"
      >
        立即登入
      </button>
      <button
        class="bg-poseidon-500 hover:bg-poseidon-600 ml-6 hidden rounded-full px-5 py-2 text-white shadow-md transition md:block"
      >
        立即註冊
      </button>
      <button
        class="bg-poseidon-500 hover:bg-poseidon-600 ml-6 hidden rounded-full px-5 py-2 text-white shadow-md transition md:block"
        @click="handleLogout"
      >
        登出
      </button>
      <!-- 手機選單（可擴充） -->
    </nav>
  </header>
</template>

<script setup>
const { $supabase } = useNuxtApp();
const { $Swal } = useNuxtApp();
const router = useRouter();

const links = [
  { label: '首頁', href: '/' },
  { label: '我的預約', href: '/bookings' },
  { label: '我的收藏', href: '/favorites' },
  { label: '會員中心', href: '/account' },
];

const handleLogout = async () => {
  const { error } = await $supabase.auth.signOut();
  if (error) {
    $Swal.fire({
      icon: 'error',
      title: error.code,
      text: error.message || '登出過程中發生錯誤，請稍後再試',
    });
  } else {
    $Swal.fire({
      icon: 'success',
      title: '登出成功',
      text: '感謝您的使用!',
    });
    await router.push('/');
  }
};
</script>

<style scoped>
/* 可自訂 header 陰影或透明度 */
</style>
