// plugins/anime.ts

import { animate,utils } from "animejs";
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide("anime", animate);
  nuxtApp.provide("animeUtils", utils);
});