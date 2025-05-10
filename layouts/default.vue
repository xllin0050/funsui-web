<template>
  <div>
    <AppHeader />
    <div class="pt-20">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from "~/components/AppFooter.vue";
import AppHeader from "~/components/AppHeader.vue";
</script>
