import { defineStore } from 'pinia'

interface Favorite {
  id: number;
  name: string;
  location: string;
  type: string;
  category: string;
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [
      {
        id: 11,
        name: '綠島深潛體驗',
        location: '綠島',
        type: '體驗',
        category: '潛水課程',
      },
      {
        id: 12,
        name: '小琉球自由潛水',
        location: '小琉球',
        type: '自由潛',
        category: '活動',
      },
      {
        id: 13,
        name: '龍洞專業導潛',
        location: '龍洞',
        type: '導潛',
        category: '專業服務',
      },
    ] as Favorite[],
  }),
  
  getters: {
    getFavorites: (state) => state.favorites as Favorite[],
    getFavoriteCount: (state) => state.favorites.length,
    isFavorite: (state) => (id: number) => state.favorites.some(fav => fav.id === id),
  },
  
  actions: {
    addFavorite(item: Favorite) {
      // 檢查項目是否已存在於收藏中
      const exists = this.favorites.some(fav => fav.id === item.id)
      if (!exists) {
        // 添加到收藏列表
        this.favorites.push({
          ...item
        })
        return true
      }
      return false
    },
    
    removeFavorite(id: number) {
      const index = this.favorites.findIndex(fav => fav.id === id)
      if (index !== -1) {
        this.favorites.splice(index, 1)
        return true
      }
      return false
    },
    
    toggleFavorite(item: Favorite) {
      if (this.isFavorite(item.id)) {
        return this.removeFavorite(item.id)
      } else {
        return this.addFavorite(item)
      }
    }
  },
})
