import { ref } from 'vue'

export const useServices = () => {
  const { $supabase } = useNuxtApp()
  const services = ref([])
  const loading = ref(false)
  const error = ref(null)

  const searchServices = async (filters = {}) => {
    loading.value = true
    error.value = null
    
    try {
      // 檢查 Supabase 客戶端是否存在
      if (!$supabase) {
        throw new Error('Supabase 客戶端未初始化')
      }
      
      let query = $supabase
        .from('services')
        .select('*')
      
      // 應用過濾器
      if (filters.q) {
        // 搜索名稱、描述等文本字段
        query = query.or(`name.ilike.%${filters.q}%,description.ilike.%${filters.q}%`)
      }
      
      if (filters.type) {
        query = query.eq('type', filters.type)
      }
      
      if (filters.region) {
        query = query.eq('region', filters.region)
      }
      
      if (filters.price) {
        query = query.lte('price', filters.price)
      }
      
      if (filters.exp) {
        query = query.eq('experience_level', filters.exp)
      }
      
      if (filters.lang) {
        // 使用 cs（contains）操作符搜索數組字段
        query = query.cs('languages', [filters.lang])
      }
      
      const { data, error: searchError } = await query
      
      if (searchError) throw searchError
      
      services.value = data || []
      return data || []
    } catch (err) {
      error.value = err.message
      console.error('搜尋服務時出錯:', err)
      // 返回空數組而不是 undefined
      services.value = []
      return []
    } finally {
      loading.value = false
    }
  }
  
  return {
    services,
    loading,
    error,
    searchServices
  }
}
