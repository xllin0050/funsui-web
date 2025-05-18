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
      <template v-if="!isAuthenticated">
        <NuxtLink
          to="/login"
          class="bg-poseidon-500 hover:bg-poseidon-600 ml-6 hidden rounded-full px-5 py-2 text-white shadow-md transition md:block"
        >
          立即登入
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="bg-poseidon-100 hover:bg-poseidon-200 text-poseidon-700 ml-4 hidden rounded-full px-5 py-2 shadow-md transition md:block"
        >
          立即註冊
        </NuxtLink>
      </template>
      <template v-else>
        <NuxtLink
          to="/account"
          class="text-poseidon-700 hover:text-poseidon-900 ml-6 hidden items-center space-x-2 font-medium md:flex"
        >
          <span class="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
            <img
              v-if="user?.user_metadata?.avatar_url"
              :src="user.user_metadata.avatar_url"
              alt="User avatar"
              class="h-full w-full object-cover"
            />
            <div v-else class="flex h-full w-full items-center justify-center bg-poseidon-500 text-white">
              {{ user?.email?.charAt(0).toUpperCase() || 'U' }}
            </div>
          </span>
          <span class="hidden md:inline">{{ user?.email || user?.user_metadata?.name || '會員' }}</span>
        </NuxtLink>
        <button
          class="bg-poseidon-500 hover:bg-poseidon-600 ml-4 hidden rounded-full px-5 py-2 text-white shadow-md transition md:block"
          @click="handleLogout"
        >
          登出
        </button>
      </template>
      <!-- 手機選單（可擴充） -->
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { useAuthState } from '~/composables/useAuthState';

const authStore = useAuthStore();
const { $supabase } = useNuxtApp();
const { $Swal } = useNuxtApp();
const router = useRouter();

// 使用認證狀態
const { user, isAuthenticated } = useAuthState();

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
    authStore.clearUser();
    await router.push('/');
  }
};
</script>

<style scoped>
/* 可自訂 header 陰影或透明度 */
</style>
