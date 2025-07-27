<template>
  <div
    v-if="visible"
    class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
    @click.self="closeModal"
  >
    <div
      class="mx-4 w-full max-w-md overflow-hidden rounded-lg bg-poseidon-50 shadow-lg sm:w-1/2"
    >
      <div class="flex items-center justify-between border-b p-4">
        <h3 class="text-lg font-semibold text-gray-900">
          <slot name="header"></slot>
        </h3>
        <button
          class="text-2xl text-gray-400 hover:text-gray-500"
          @click="closeModal"
        >
          &times;
        </button>
      </div>
      <div class="p-4">
        <slot name="body"></slot>
      </div>
      <div class="flex justify-end border-t p-4">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const { visible } = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

// Close modal when pressing Escape key
const handleEscape = e => {
  if (e.key === 'Escape') {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
