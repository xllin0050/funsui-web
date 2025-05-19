<template>
  <!-- 頁首 Header，含 Logo、導覽列與 CTA 按鈕 -->
  <header
    class="fixed top-0 left-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur"
    v-bind="$attrs"
  >
    <nav class="container mx-auto flex items-center justify-between px-4 py-4">
      <!-- Logo -->
      <div class="text-poseidon-700 text-2xl font-bold tracking-wide">
        Funsui
      </div>
      <!-- 導覽列 -->
      <ul class="text-poseidon-800 hidden space-x-16 px-8 font-medium md:flex">
        <li v-for="link in links" :key="link.href">
          <NuxtLink :to="link.href" class="hover:text-poseidon-500 transition">
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
      <div class="hidden flex-1 items-center justify-end md:flex">
        <!-- CTA 按鈕 -->
        <template v-if="!isAuthenticated">
          <NuxtLink
            to="/login"
            class="bg-poseidon-500 hover:bg-poseidon-600 ml-2 rounded-full px-5 py-2 text-white shadow-md transition"
          >
            立即登入
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="bg-poseidon-100 hover:bg-poseidon-200 text-poseidon-700 ml-4 rounded-full px-5 py-2 shadow-md transition"
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
              <div
                v-else
                class="bg-poseidon-500 flex h-full w-full items-center justify-center text-white"
              >
                {{ user?.email?.charAt(0).toUpperCase() || 'U' }}
              </div>
            </span>
            <span class="hidden md:inline">{{
              user?.email || user?.user_metadata?.name || '會員'
            }}</span>
          </NuxtLink>
          <button
            class="bg-poseidon-500 hover:bg-poseidon-600 ml-4 hidden rounded-full px-5 py-2 text-white shadow-md transition md:block"
            @click="logout"
          >
            登出
          </button>
        </template>
      </div>
      <!-- 手機選單按鈕 -->
      <button
        class="text-poseidon-700 hover:text-poseidon-500 p-2 transition md:hidden"
        aria-label="開啟選單"
        @click="toggleMobileMenu"
      >
        <svg
          v-if="!mobileMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- 手機側邊選單背景遮罩 -->
      <div
        v-show="mobileMenuOpen"
        class="bg-opacity-30 fixed inset-0 z-40 h-screen w-screen bg-black transition-opacity duration-500 ease-out md:hidden"
        @click="closeMobileMenu"
      ></div>

      <!-- 手機側邊選單 -->
      <div
        v-show="mobileMenuOpen"
        class="fixed top-0 right-0 z-50 h-screen w-64 transform overflow-y-auto bg-white p-6 shadow-lg transition-all duration-500 ease-out md:hidden"
        :class="{
          'translate-x-0': mobileMenuOpen,
          'translate-x-full': !mobileMenuOpen,
        }"
      >
        <div class="mb-8 flex items-center justify-between">
          <div class="text-poseidon-700 text-xl font-bold">Funsui</div>
          <button
            class="text-poseidon-700 hover:text-poseidon-500 p-2"
            aria-label="關閉選單"
            @click="closeMobileMenu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul class="mb-8 space-y-4">
          <li v-for="link in links" :key="link.href">
            <NuxtLink
              :to="link.href"
              class="text-poseidon-800 hover:text-poseidon-500 block py-2 font-medium transition"
              @click="closeMobileMenu"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <div class="space-y-2">
          <template v-if="!isAuthenticated">
            <NuxtLink
              to="/login"
              class="bg-poseidon-500 hover:bg-poseidon-600 block w-full rounded-full px-5 py-2 text-center text-white shadow-md transition"
              @click="closeMobileMenu"
            >
              立即登入
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="bg-poseidon-100 hover:bg-poseidon-200 text-poseidon-700 block w-full rounded-full px-5 py-2 text-center shadow-md transition"
              @click="closeMobileMenu"
            >
              立即註冊
            </NuxtLink>
          </template>
          <template v-else>
            <div class="mb-4 flex items-center space-x-3">
              <span class="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                <img
                  v-if="user?.user_metadata?.avatar_url"
                  :src="user.user_metadata.avatar_url"
                  alt="User avatar"
                  class="h-full w-full object-cover"
                />
                <div
                  v-else
                  class="bg-poseidon-500 flex h-full w-full items-center justify-center text-white"
                >
                  {{ user?.email?.charAt(0).toUpperCase() || 'U' }}
                </div>
              </span>
              <span>{{
                user?.email || user?.user_metadata?.name || '會員'
              }}</span>
            </div>
            <button
              class="bg-poseidon-500 hover:bg-poseidon-600 block w-full rounded-full px-5 py-2 text-center text-white shadow-md transition"
              @click="
                () => {
                  logout();
                  closeMobileMenu();
                }
              "
            >
              登出
            </button>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthState } from '~/composables/useAuthState';
import { useLogOut } from '~/composables/useLogOut';

// 使用認證狀態
const { user, isAuthenticated } = useAuthState();
// 使用登出功能
const { logout } = useLogOut();

// 導覽連結
const links = [
  { label: '首頁', href: '/' },
  { label: '我的預約', href: '/bookings' },
  { label: '我的收藏', href: '/favorites' },
  { label: '會員中心', href: '/account' },
];

// 手機選單狀態
const mobileMenuOpen = ref(false);

// 切換手機選單
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'; // 防止背景滾動
  } else {
    document.body.style.overflow = ''; // 恢復滾動
  }
}

// 關閉手機選單
function closeMobileMenu() {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
}

// 監聽路由變化時關閉選單
onMounted(() => {
  const router = useRouter();
  router.afterEach(() => {
    closeMobileMenu();
  });
});
</script>

<style scoped>
/* 可自訂 header 陰影或透明度 */
</style>
