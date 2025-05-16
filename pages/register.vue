<template>
  <main class="page-container bg-poseidon-50 h-full font-sans">
    <MemberRegistrationForm />
  </main>
</template>

<script setup>
import MemberRegistrationForm from '~/components/MemberRegistrationForm.vue';
</script>

<style scoped>
.page-container {
  height: calc(100vh - 164px);
  /* display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  background-color: #F0F4F8; 
  padding: 20px; */
}
</style>
