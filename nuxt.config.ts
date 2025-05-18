// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3100,
  },
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@pinia/nuxt', '@nuxt/eslint', '@nuxt/test-utils/module', '@nuxt/image', '@nuxt/icon'],
  // 將環境變數暴露給客戶端
  runtimeConfig: {
    // 僅在伺服器端可用的私有金鑰
    // privateKey: process.env.PRIVATE_KEY,

    // 公開金鑰，也可在客戶端使用
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
});
