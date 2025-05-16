<template>
  <div class="w-full">
    <AppHeader />
    <div class="main-content pt-[5rem] w-full">
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
.main-content {
  min-height: calc(100vh - 6rem);
}

</style>
