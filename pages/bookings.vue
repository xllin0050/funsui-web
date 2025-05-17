<template>
  <div class="relative h-full w-full flex-1 px-4 py-8">
    <div class="absolute inset-0 h-full w-full">
      <WavesSVG />
    </div>
    <h1 class="text-poseidon-700 mb-6 text-center text-3xl font-bold">我的預約</h1>
    <div class="mx-auto grid w-full gap-6 md:grid-cols-2 lg:w-3/4 lg:grid-cols-3">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="glass-card border-poseidon-100 flex flex-col justify-between rounded-xl border p-6 shadow-md transition hover:shadow-lg"
      >
        <div>
          <div class="mb-2 flex items-center">
            <span class="text-poseidon-600 text-lg font-semibold">{{ booking.site }}</span>
            <span class="bg-poseidon-100 text-poseidon-500 ml-2 rounded px-2 py-0.5 text-xs">{{
              booking.region
            }}</span>
          </div>
          <div class="mb-1 text-gray-600">日期：{{ booking.date }}</div>
          <div class="mb-1 text-gray-600">人數：{{ booking.people }}</div>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span :class="statusClass(booking.status)">{{ booking.status }}</span>
          <button class="text-poseidon-500 hover:underline">詳細</button>
        </div>
      </div>
    </div>
    <div v-if="bookings.length === 0" class="mt-8 text-center text-gray-400">目前沒有預約紀錄</div>
  </div>
</template>

<script setup>
import WavesSVG from '~/components/base/WavesSVG.vue';

const bookings = [
  { id: 1, site: '小琉球', region: '南部', date: '2025-06-15', people: 2, status: '已確認' },
  { id: 2, site: '綠島', region: '離島', date: '2025-07-02', people: 1, status: '待付款' },
  { id: 3, site: '龍洞', region: '北部', date: '2025-08-10', people: 3, status: '已取消' },
];

function statusClass(status) {
  if (status === '已確認') return 'text-green-600 font-bold';
  if (status === '待付款') return 'text-yellow-500 font-bold';
  if (status === '已取消') return 'text-gray-400 font-bold line-through';
  return '';
}
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
