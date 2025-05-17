<template>
  <div class="registration-form-container">
    <h2 class="form-title">會員註冊</h2>
    <form class="registration-form" @submit.prevent="handleSubmit">
      <div class="form-content">
        <!-- 姓名 -->
        <!-- <div class="form-group">
          <label for="name">姓名</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            placeholder="請輸入您的姓名"
            class="form-input"
            :disabled="loading"
          />
        </div> -->

        <!-- 電話 -->
        <!-- <div class="form-group">
          <label for="phone">電話</label>
          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
            required
            placeholder="例如: 0912345678"
            class="form-input"
            :disabled="loading"
          />
        </div> -->

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
            placeholder="請設定密碼 (至少 6 位)"
            class="form-input"
            :disabled="loading"
            minlength="6"
          />
        </div>

        <!-- 性別 -->
        <!-- <div class="form-group">
          <label for="gender">性別</label>
          <select
            id="gender"
            v-model="formData.gender"
            required
            class="form-select"
            :disabled="loading"
          >
            <option value="">請選擇</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">其他</option>
          </select>
        </div> -->

        <div class="form-group">
          <button type="submit" class="submit-button" :disabled="loading">
            <span v-if="loading">註冊中...</span>
            <span v-else>註冊</span>
          </button>
        </div>

        <div class="form-group mt-4 text-center">
          <p class="text-sm text-gray-600">
            已經有帳號了？
            <NuxtLink to="/login" class="text-poseidon-600 hover:underline">登入</NuxtLink>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { $supabase } = useNuxtApp();
const { $Swal } = useNuxtApp();
const router = useRouter();
const loading = ref(false);

const formData = ref({
  email: '',
  password: '',
});

async function handleSubmit() {
  loading.value = true;

  try {
    // 1. 創建新用戶
    const { error: authError } = await $supabase.auth.signUp({
      email: formData.value.email,
      password: formData.value.password,
    });

    if (authError) throw authError;
    // 4. 註冊成功，轉導到登入頁
    await router.push('/login');
  } catch (e) {
    console.error('註冊錯誤:', e);
    $Swal.fire({
      icon: 'error',
      title: e.code,
      text: e.message || '註冊過程中發生錯誤，請稍後再試',
    });
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.registration-form-container {
  max-width: 600px;
  margin: 10px auto;
  padding: 30px;
  background-color: var(--color-poseidon-50);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.form-title {
  text-align: center;
  color: var(--color-poseidon-800);
  margin-bottom: 30px;
  font-size: 2.2em;
  font-weight: bold;
}

.registration-form {
  display: flex;
  flex-direction: column;
}

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
