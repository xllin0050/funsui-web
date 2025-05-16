<template>
  <div class="container mx-auto px-4 py-8 flex flex-col items-center">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg border border-poseidon-100">
      <div class="flex flex-col items-center mb-6">
        <div class="w-20 h-20 rounded-full bg-poseidon-100 flex items-center justify-center text-4xl text-poseidon-500 font-bold mb-2">
          {{ user.name.charAt(0) }}
        </div>
        <h1 class="text-2xl font-bold text-poseidon-700">{{ user.name }}</h1>
        <div class="text-gray-500">{{ user.email }}</div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-poseidon-50 rounded-lg p-4 flex flex-col items-center"
        >
          <span class="text-poseidon-600 text-xl font-bold">{{ stat.value }}</span>
          <span class="text-gray-500 text-sm mt-1">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = {
  name: '王小明',
  email: 'diver@example.com'
}
const stats = [
  { label: '預約紀錄', value: 3 },
  { label: '收藏服務', value: 8 },
  { label: '會員等級', value: '白金' }
]
</script>

<style scoped>
</style>
