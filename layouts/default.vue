<template>
  <div class="w-full h-screen">
    <AppHeader />
    <div class="pt-[72px] w-full h-full">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from "~/components/AppFooter.vue";
import AppHeader from "~/components/AppHeader.vue";
</script>

<style scoped>

</style>
