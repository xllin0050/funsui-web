<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-poseidon-700 mb-6 text-center">我的收藏</h1>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in favorites"
        :key="item.id"
        class="bg-white rounded-xl shadow-md p-6 border border-poseidon-100 hover:shadow-lg transition flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center mb-2">
            <span class="text-poseidon-600 font-semibold text-lg">{{ item.name }}</span>
            <span class="ml-2 px-2 py-0.5 rounded text-xs bg-poseidon-100 text-poseidon-500">{{ item.type }}</span>
          </div>
          <div class="text-gray-600 mb-1">地點：{{ item.location }}</div>
          <div class="text-gray-600 mb-1">服務類型：{{ item.category }}</div>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <button class="text-poseidon-500 hover:underline">查看</button>
          <button class="text-red-400 hover:text-red-600 transition">移除</button>
        </div>
      </div>
    </div>
    <div v-if="favorites.length === 0" class="text-center text-gray-400 mt-8">目前沒有收藏紀錄</div>
  </div>
</template>

<script setup>
const favorites = [
  { id: 1, name: '綠島深潛體驗', location: '綠島', type: '體驗', category: '潛水課程' },
  { id: 2, name: '小琉球自由潛水', location: '小琉球', type: '自由潛', category: '活動' },
  { id: 3, name: '龍洞專業導潛', location: '龍洞', type: '導潛', category: '專業服務' }
]
</script>

<style scoped>
</style>
