<template>
  <!-- 推薦潛水地點 Cards -->
  <section id="locations" class="py-16 bg-gradient-to-b from-poseidon-500 to-poseidon-50">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 text-white">熱門潛水地點推薦</h2>
      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="(loc, i) in locations"
          :key="i"
          ref="cardRefs"
          class="bg-transparent overflow-hidden hover:scale-105 transition px-4 lg:p-0 h-[200px] lg:h-[300px] flex flex-col"
        >
          <div class="relative h-full w-full overflow-hidden">
            <div
              class="absolute hidden lg:block inset-0 bg-cover bg-center"
              :style="{
                backgroundImage: `url(${loc.img})`,
                maskImage: getBlobMaskUrl(i),
                WebkitMaskImage: getBlobMaskUrl(i),
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
              }"
            ></div>
            <div
              class="absolute lg:hidden inset-0 bg-cover bg-center"
              :style="{
                backgroundImage: `url(${loc.img})`,
              }"
            ></div>
            <div
              class="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 flex-1 flex flex-col"
            >
              <h3 class="text-base lg:text-xl font-bold text-white mb-2">
                {{ loc.name }}
              </h3>
              <!-- <p class="text-gray-600 mb-4 flex-1">{{ loc.desc }}</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTemplateRef, onMounted } from "vue";
const { $anime, $animeUtils, $animeStagger } = useNuxtApp();

// 使用 base64 編碼的 SVG 作為 mask-image
// 注意：我們原本試圖為每個卡片生成不同的 blob 形狀，
// 但因為在 SSR 環境中使用 btoa 函數可能會失敗，
// 所以我們改為使用預設的静態 blob 形狀。

// 預設的 blob mask URL
const blobMaskUrl =
  "url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDkuNSwtNTAuMkM2My44LC0zNS4yLDc0LjgsLTE3LjYsNzcsMi4xQzc5LjEsMjEuOSw3Mi40LDQzLjgsNTguMSw1OC45QzQzLjgsNzQsMjEuOSw4Mi40LC0wLjYsODIuOUMtMjMsODMuNSwtNDYsNzYuMiwtNjAuOCw2MS4xQy03NS41LDQ2LC04Mi4xLDIzLC04MC40LDEuNkMtNzguOCwtMTkuNywtNjksLTM5LjUsLTU0LjMsLTU0LjVDLTM5LjUsLTY5LjUsLTE5LjcsLTc5LjgsLTEuMSwtNzguN0MxNy42LC03Ny43LDM1LjIsLTY1LjIsNDkuNSwtNTAuMloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMCAxMDApIi8+PC9zdmc+')";

// 生成 blob mask URL 的函數 - 目前因為 SSR 環境下的限制，我們會為所有卡片使用相同的 blob 形狀
function getBlobMaskUrl(_index) {
  return blobMaskUrl;
}

const cardRefs = useTemplateRef("cardRefs");

const grid = [3, 2];

function animateCards() {
  const from = $animeUtils.random(0, 3);
  // const ramdomElement = $animeUtils.randomPick(cardRefs.value);
  $anime(cardRefs.value, {
    translateX: [
      { to: $animeStagger("2px", { grid, from, axis: "x" }) },
      { to: 0, ease: "inOutQuad" },
    ],
    translateY: [
      { to: $animeStagger("2px", { grid, from, axis: "y" }) },
      { to: 0, ease: "inOutQuad" },
    ],
    rotate: $animeStagger("-2deg", { grid, from }),
    opacity: [{ to: 0.8, ease: "inOutCubic" }, { to: 1 }],
    delay: $animeStagger(85, { grid, from }),
    onComplete: animateCards,
  });
}

onMounted(() => {
  animateCards();
});

// 推薦潛水地點資料，可依需求調整
const locations = [
  {
    name: "大堡礁（澳洲）",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    desc: "世界最大珊瑚礁群，色彩繽紛的海底世界與豐富生態。",
  },
  {
    name: "帛琉藍洞",
    img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
    desc: "知名的藍洞潛水勝地，水質清澈，能見度極高。",
  },
  {
    name: "峇里島圖蘭本",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    desc: "著名沈船潛點，適合各級潛水員，生態豐富。",
  },
  {
    name: "菲律賓阿波島",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    desc: "火山島地形，珊瑚與海龜共舞的夢幻場域。",
  },
  {
    name: "紅海達哈布",
    img: "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=600&q=80",
    desc: "藍洞與珊瑚花園，潛水天堂。",
  },
  {
    name: "沖繩慶良間群島",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
    desc: "白沙與蔚藍海水，豐富海洋生態。",
  },
];
</script>

<style scoped></style>
