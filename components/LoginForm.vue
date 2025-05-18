<template>
  <div class="mx-auto max-w-lg">
    <form @submit.prevent="handleSubmit">
      <!-- 電子信箱 -->
      <div class="form-group">
        <label for="email">電子信箱</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          placeholder="例如: yourname@example.com"
          class="form-input"
          :disabled="loading"
        />
      </div>
      <!-- 密碼 -->
      <div class="form-group">
        <label for="password">密碼</label>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          required
          placeholder="請輸入密碼"
          class="form-input"
          :disabled="loading"
          minlength="6"
        />
      </div>
      <div class="flex justify-center">
        <button type="submit" class="submit-button" :disabled="loading">登入</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
const { $supabase } = useNuxtApp();
const { $Swal } = useNuxtApp();

const router = useRouter();

const formData = ref({
  email: '',
  password: '',
});

const handleSubmit = async () => {
  const { data, error } = await $supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  });

  if (error) {
    $Swal.fire({
      icon: 'error',
      title: error.code,
      text: error.message || '登入過程中發生錯誤，請稍後再試',
    });
  } else {
    $Swal.fire({
      icon: 'success',
      title: '登入成功',
      text: '歡迎回到我們的網站!',
    });
    authStore.setUserId(data.session.user.id);
    console.log(data.session.access_token);
    console.log(data.session.user.id);

    await router.push('/');
  }
};
</script>

<style scoped>
.form-content {
  display: grid;
  grid-template-columns: 1fr;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin: 8px 0;
  color: var(--color-poseidon-800);
  font-weight: bold;
  font-size: 0.95em;
}

.form-group input[type='text'],
.form-group input[type='tel'],
.form-group input[type='email'],
.form-group input[type='password'],
.form-group select {
  padding: 12px 15px;
  border: 1px solid var(--color-poseidon-200);
  border-radius: 8px;
  font-size: 1em;
  background-color: var(--color-poseidon-50);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  color: var(--color-poseidon-800);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-poseidon-600);
  box-shadow: 0 0 0 3px rgba(121, 85, 0, 0.2);
}

.submit-button {
  background-color: var(--color-poseidon-500);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  margin-top: 30px;
  align-self: center; /* 按鈕置中 */
}

.submit-button:hover {
  background-color: var(--color-poseidon-700); /* 深一點的藍綠 */
  transform: translateY(-2px);
}

.submit-button:active {
  transform: translateY(0);
}

/* Placeholder styling */
::placeholder {
  color: var(--color-poseidon-600);
  opacity: 0.8;
}
</style>
