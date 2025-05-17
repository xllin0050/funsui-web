<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <div class="flex h-full flex-1 flex-col pt-[5rem]">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';
</script>

<style scoped></style>
