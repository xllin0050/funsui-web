import { ref, onMounted, onUnmounted } from 'vue';

export const useAuthState = () => {
  const { $supabase } = useNuxtApp();
  const user = ref(null);
  const isAuthenticated = ref(false);
  let authListener = null;

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await $supabase.auth.getSession();
      user.value = session?.user || null;
      isAuthenticated.value = !!session?.user;
      return session?.user;
    } catch (error) {
      console.error('Error checking user session:', error);
      user.value = null;
      isAuthenticated.value = false;
      return null;
    }
  };

  const setupAuthListener = () => {
    // 監聽認證狀態變化
    const {
      data: { subscription },
    } = $supabase.auth.onAuthStateChange(async (event, session) => {
      user.value = session?.user || null;
      isAuthenticated.value = !!session?.user;

      // 如果需要，可以在這裡處理不同的事件
      if (event === 'SIGNED_IN') {
        console.log('User signed in:', user.value);
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
      }
    });

    return subscription;
  };

  onMounted(async () => {
    // 初始檢查用戶狀態
    await checkUser();

    // 設置監聽器
    authListener = setupAuthListener();
  });

  onUnmounted(() => {
    // 清理監聽器
    if (authListener) {
      authListener.unsubscribe();
    }
  });

  return {
    user,
    isAuthenticated,
    checkUser,
  };
};
