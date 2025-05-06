<template>
  <div class="component-panel">
    <div class="component-header">
      <button class="close-btn" @click="$emit('close')">
        <Icon
          name="heroicons:x-mark"
          size="1.5rem"
          class="text-poseidon-600 hover:text-poseidon-800"
        />
      </button>
    </div>
    <div class="component-inner">
      <!-- 使用默認插槽来展示内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineEmits(["close"]);
</script>

<style scoped>
.component-panel {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
  overflow: hidden;
}

.component-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 20px;
  background-color: #f1f8fe;
  border-bottom: 1px solid #e4f0fb;
}

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

.component-inner {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 20px;
}
</style>
