<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-poseidon-700 mb-6 text-center">我的預約</h1>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="bg-white rounded-xl shadow-md p-6 border border-poseidon-100 hover:shadow-lg transition flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center mb-2">
            <span class="text-poseidon-600 font-semibold text-lg">{{ booking.site }}</span>
            <span class="ml-2 px-2 py-0.5 rounded text-xs bg-poseidon-100 text-poseidon-500">{{ booking.region }}</span>
          </div>
          <div class="text-gray-600 mb-1">日期：{{ booking.date }}</div>
          <div class="text-gray-600 mb-1">人數：{{ booking.people }}</div>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span :class="statusClass(booking.status)">{{ booking.status }}</span>
          <button class="text-poseidon-500 hover:underline">詳細</button>
        </div>
      </div>
    </div>
    <div v-if="bookings.length === 0" class="text-center text-gray-400 mt-8">目前沒有預約紀錄</div>
  </div>
</template>

<script setup>
const bookings = [
  { id: 1, site: '小琉球', region: '南部', date: '2025-06-15', people: 2, status: '已確認' },
  { id: 2, site: '綠島', region: '離島', date: '2025-07-02', people: 1, status: '待付款' },
  { id: 3, site: '龍洞', region: '北部', date: '2025-08-10', people: 3, status: '已取消' }
]

function statusClass(status) {
  if (status === '已確認') return 'text-green-600 font-bold';
  if (status === '待付款') return 'text-yellow-500 font-bold';
  if (status === '已取消') return 'text-gray-400 font-bold line-through';
  return '';
}
</script>

<style scoped>
</style>
