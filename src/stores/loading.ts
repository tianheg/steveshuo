import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)

  const updateLoadingStore = (flag: boolean) => {
    isLoading.value = flag
  }

  function onLoading(flag: boolean) {
    updateLoadingStore(flag)
  }

  return {
    isLoading,
    updateLoadingStore,
    onLoading
  }
})
