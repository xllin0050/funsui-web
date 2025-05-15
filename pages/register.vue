<template>
  <div class="page-container">
    <MemberRegistrationForm />
  </div>
</template>

<script setup>
import MemberRegistrationForm from '~/components/MemberRegistrationForm.vue';
</script>

<style scoped>
.page-container {

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  background-color: #F0F4F8; /* 頁面背景色，可以根據整體風格調整 */
  padding: 20px;
}
</style>
