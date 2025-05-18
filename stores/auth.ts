import { defineStore } from 'pinia';

interface AuthState {
  userId: string | null;
  // Supabase client handles the access token via HttpOnly cookies by default
  // so we might not need to store it explicitly here unless for specific UI needs.
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userId: null,
  }),
  actions: {
    setUserId(id: string) {
      this.userId = id;
    },
    clearUser() {
      this.userId = null;
      // Potentially call Supabase signout here as well if needed from the store
      // const supabase = useSupabaseClient();
      // await supabase.auth.signOut();
    },
  },
  getters: {
    isAuthenticated: state => !!state.userId,
    currentUserId: state => state.userId,
  },
  // If you want to persist this store (e.g., userId) across sessions using localStorage
  // you'll need 'pinia-plugin-persistedstate'.
  // 1. Install it: npm install pinia-plugin-persistedstate or yarn add pinia-plugin-persistedstate
  // 2. Register it in your Nuxt 3 Pinia setup (e.g., plugins/pinia.ts or nuxt.config.ts).
  // Example persist configuration:
  // persist: true,
  // Or with options:
  /*
  persist: {
    storage: persistedState.localStorage, // or sessionStorage
    paths: ['userId'], // specify which state properties to persist
  },
  */
});
