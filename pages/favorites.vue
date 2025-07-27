<template>
  <div class="relative h-full w-full flex-1 px-4 py-8">
    <div class="absolute inset-0 h-full w-full">
      <WavesSVG />
    </div>
    <h1 class="text-poseidon-700 mb-6 text-center text-3xl font-bold">
      我的收藏
    </h1>
    <div
      class="mx-auto grid w-full gap-6 md:grid-cols-2 lg:w-3/4 lg:grid-cols-3"
    >
      <div
        v-for="item in favorites"
        :key="item.id"
        class="glass-card border-poseidon-100 flex flex-col justify-between rounded-xl border p-6 shadow-md transition hover:shadow-lg"
      >
        <div>
          <div class="mb-2 flex items-center">
            <span class="text-poseidon-600 text-lg font-semibold">{{
              item.name
            }}</span>
            <span
              class="bg-poseidon-100 text-poseidon-500 ml-2 rounded px-2 py-0.5 text-xs"
              >{{ item.type }}</span
            >
          </div>
          <div class="mb-1 text-gray-600">地點：{{ item.location }}</div>
          <div class="mb-1 text-gray-600">服務類型：{{ item.category }}</div>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <button
            class="text-poseidon-500 hover:underline"
            @click="viewDetails(item)"
          >
            查看
          </button>
          <button
            class="text-red-400 transition hover:text-red-600"
            @click="removeFavorite(item.id)"
          >
            移除
          </button>
        </div>
      </div>
    </div>
    <div v-if="favorites.length === 0" class="mt-8 text-center text-gray-400">
      目前沒有收藏紀錄
    </div>
    <Modal :visible="showModal" @close="closeModal">
      <template #header>
        <h3 v-if="selectedItem">{{ selectedItem.name }} 詳細資訊</h3>
      </template>
      <template #body>
        <div v-if="selectedItem" class="space-y-4">
          <div class="flex items-center">
            <span class="w-24 font-semibold text-gray-700">名稱：</span>
            <span>{{ selectedItem.name }}</span>
          </div>
          <div class="flex items-center">
            <span class="w-24 font-semibold text-gray-700">地點：</span>
            <span>{{ selectedItem.location }}</span>
          </div>
          <div class="flex items-center">
            <span class="w-24 font-semibold text-gray-700">類型：</span>
            <span>
              <span
                class="bg-poseidon-100 text-poseidon-500 rounded px-2 py-0.5 text-xs"
              >
                {{ selectedItem.type }}
              </span>
            </span>
          </div>
          <div class="flex items-center">
            <span class="w-24 font-semibold text-gray-700">服務類型：</span>
            <span>{{ selectedItem.category }}</span>
          </div>
          <div class="pt-4">
            <p class="text-gray-600">
              這是一個很棒的潛水體驗，提供專業的指導和安全的環境。
            </p>
          </div>
        </div>
      </template>
      <template #footer>
        <button
          class="bg-poseidon-500 hover:bg-poseidon-600 rounded px-4 py-2 font-semibold text-white"
          @click="closeModal"
        >
          關閉
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import WavesSVG from '~/components/base/WavesSVG.vue';
import Modal from '~/components/Modal.vue';

const favorites = ref([
  {
    id: 1,
    name: '綠島深潛體驗',
    location: '綠島',
    type: '體驗',
    category: '潛水課程',
  },
  {
    id: 2,
    name: '小琉球自由潛水',
    location: '小琉球',
    type: '自由潛',
    category: '活動',
  },
  {
    id: 3,
    name: '龍洞專業導潛',
    location: '龍洞',
    type: '導潛',
    category: '專業服務',
  },
]);

const removeFavorite = id => {
  favorites.value = favorites.value.filter(item => item.id !== id);
};

// Modal 相關狀態
const showModal = ref(false);
const selectedItem = ref(null);

const viewDetails = item => {
  selectedItem.value = item;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedItem.value = null;
};
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
