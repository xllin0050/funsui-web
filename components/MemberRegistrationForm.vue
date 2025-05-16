<template>
  <div class="registration-form-container">
    <h2 class="form-title">會員註冊</h2>
    <form class="registration-form" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <div class="form-group">
          <label for="name">姓名</label>
          <input id="name" v-model="formData.name" type="text" required placeholder="請輸入您的姓名">
        </div>
        <div class="form-group">
          <label for="phone">電話</label>
          <input id="phone" v-model="formData.phone" type="tel" required placeholder="例如: 0912345678">
        </div>
        <div class="form-group full-width">
          <label for="email">電子信箱</label>
          <input id="email" v-model="formData.email" type="email" required placeholder="例如: yourname@example.com">
        </div>
        <div class="form-group">
          <label for="gender">性別</label>
          <select id="gender" v-model="formData.gender" required>
            <option disabled value="">請選擇</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div class="form-group">
          <label for="title">稱呼</label>
          <select id="title" v-model="formData.title" required>
            <option disabled value="">請選擇</option>
            <option value="mr">先生</option>
            <option value="ms">女士</option>
            <option value="mx">君</option>
          </select>
        </div>
        <div class="form-group full-width">
          <label for="birthday">生日</label>
          <input id="birthday" v-model="formData.birthday" type="date" required>
        </div>
      </div>
      <button type="submit" class="submit-button">註冊</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  name: '',
  phone: '',
  email: '',
  gender: '',
  title: '',
  birthday: '',
});

const handleSubmit = () => {
  // 在這裡處理表單提交邏輯，例如發送 API 請求
  console.log('Form submitted:', formData.value);
  alert('註冊資料已提交 (請查看控制台)');
};
</script>

<style scoped>
.registration-form-container {
  max-width: 600px;
  margin: 10px auto;
  padding: 30px;
  background-color: #ECEFF1; /* 淺灰背景 */
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.form-title {
  text-align: center;
  color: #1A237E; /* 深藍主色 */
  margin-bottom: 30px;
  font-size: 2.2em;
  font-weight: bold;
}

.registration-form {
  display: flex;
  flex-direction: column;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
  .form-group.full-width {
    grid-column: 1 / -1; /* 讓元素佔滿整行 */
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  color: #37474F; /* 深灰文字 */
  font-weight: bold;
  font-size: 0.95em;
}

.form-group input[type="text"],
.form-group input[type="tel"],
.form-group input[type="email"],
.form-group input[type="date"],
.form-group select {
  padding: 12px 15px;
  border: 1px solid #B0BEC5; /* 邊框顏色 */
  border-radius: 8px;
  font-size: 1em;
  background-color: #FFFFFF;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  color: #333;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #00796B; /* 藍綠輔助色 */
  box-shadow: 0 0 0 3px rgba(0, 121, 107, 0.2);
}

.submit-button {
  background-color: #00796B; /* 藍綠輔助色 */
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 30px;
  align-self: center; /* 按鈕置中 */
}

.submit-button:hover {
  background-color: #004D40; /* 深一點的藍綠 */
  transform: translateY(-2px);
}

.submit-button:active {
  transform: translateY(0);
}

/* Placeholder styling */
::placeholder {
  color: #90A4AE;
  opacity: 1; 
}
</style>
