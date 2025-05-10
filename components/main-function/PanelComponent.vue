<template>
  <div class="bg-poseidon-50 rounded shadow w-full sm:w-[600px]">
    <div class="flex items-center justify-end bg-poseidon-100 p-2">
      <button class="close-btn" @click="$emit('close')">
        <Icon
          name="heroicons:x-mark"
          size="1.5rem"
          class="text-poseidon-600 hover:text-poseidon-800"
        />
      </button>
    </div>
    <div>
      <!-- 使用默認插槽来展示内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineEmits(["close"]);
</script>

<style scoped>
.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: rgba(202, 228, 247, 0.5);
}
</style>
