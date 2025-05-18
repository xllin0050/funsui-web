import { useAuthStore } from '~/stores/auth';

export const useLogIn = () => {
  const { $supabase, $Swal } = useNuxtApp();
  const router = useRouter();
  const authStore = useAuthStore();
  const loading = ref(false);
  const error = ref(null);

  const logIn = async (formData) => {
    if (!formData?.email || !formData?.password) {
      error.value = '請輸入電子郵件和密碼';
      return { success: false, error: error.value };
    }

    loading.value = true;
    error.value = null;

    try {
      const { data, error: authError } = await $supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // 更新用戶狀態
      authStore.setUserId(data.session.user.id);

      // 顯示成功訊息
      await $Swal.fire({
        icon: 'success',
        title: '登入成功',
        text: '歡迎回到我們的網站！',
        timer: 2000,
        showConfirmButton: false,
      });

      // 重定向到首頁
      await router.push('/');
      
      return { success: true, data };
    } catch (err) {
      console.error('Login error:', err);
      error.value = err.message || '登入過程中發生錯誤，請稍後再試';
      
      await $Swal.fire({
        icon: 'error',
        title: '登入失敗',
        text: error.value,
      });
      
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };

  return {
    logIn,
    loading,
    error,
  };
};
