<template>
  <!-- 推薦潛水地點 Cards -->
  <section id="locations" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 text-[color:var(--color-poseidon-700)]">熱門潛水地點推薦</h2>
      <div class="grid gap-8 md:grid-cols-3">
        <div v-for="(loc, i) in locations" :key="i" class="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition p-0 flex flex-col">
          <img :src="loc.img" :alt="loc.name" class="h-48 w-full object-cover" />
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-[color:var(--color-poseidon-700)] mb-2">{{ loc.name }}</h3>
            <p class="text-gray-600 mb-4 flex-1">{{ loc.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 推薦潛水地點資料，可依需求調整
const locations = [
  {
    name: '大堡礁（澳洲）',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    desc: '世界最大珊瑚礁群，色彩繽紛的海底世界與豐富生態。'
  },
  {
    name: '帛琉藍洞',
    img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
    desc: '知名的藍洞潛水勝地，水質清澈，能見度極高。'
  },
  {
    name: '峇里島圖蘭本',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    desc: '著名沈船潛點，適合各級潛水員，生態豐富。'
  },
  {
    name: '菲律賓阿波島',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    desc: '火山島地形，珊瑚與海龜共舞的夢幻場域。'
  },
  {
    name: '紅海達哈布',
    img: 'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=600&q=80',
    desc: '藍洞與珊瑚花園，潛水天堂。'
  },
  {
    name: '沖繩慶良間群島',
    img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80',
    desc: '白沙與蔚藍海水，豐富海洋生態。'
  }
]
</script>

<style scoped>
</style>
