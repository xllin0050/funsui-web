import { useAuthStore } from '~/stores/auth';

export const useLogOut = () => {
  const { $supabase, $Swal } = useNuxtApp();
  const router = useRouter();
  const authStore = useAuthStore();

  const logout = async () => {
    const { error } = await $supabase.auth.signOut();

    if (error) {
      $Swal.fire({
        icon: 'error',
        title: error.code,
        text: error.message || '登出過程中發生錯誤，請稍後再試',
      });
      return { success: false, error };
    }

    // 清除本地用戶狀態
    authStore.clearUser();

    // 顯示成功訊息
    await $Swal.fire({
      icon: 'success',
      title: '登出成功',
      text: '感謝您的使用！',
    });

    // 重定向到首頁
    await router.push('/');

    return { success: true };
  };

  return {
    logout,
  };
};
