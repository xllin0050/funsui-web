<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex flex-1 flex-col overflow-y-auto pt-[5rem]">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';
</script>

<style scoped></style>
