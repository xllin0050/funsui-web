import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // 創建 Supabase 客戶端
  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

  // 提供給整個應用程式使用
  return {
    provide: {
      supabase,
    },
  };
});
