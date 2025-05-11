// plugins/anime.ts

import { animate, stagger, utils } from "animejs";
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide("anime", animate);
  nuxtApp.provide("animeStagger", stagger);
  nuxtApp.provide("animeUtils", utils);
});
