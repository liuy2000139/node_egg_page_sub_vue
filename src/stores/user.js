import { defineStore } from 'pinia'
import { getUserApi } from '@/api/user.js'

export const useUser = defineStore('user', {
  state: () => ({
    userInfo: null,
    loading: false
  }),
  // getters: {
  //   loading: (state) => {
  //     console.log(state)
  //     return state.loading
  //   }
  // },
  actions: {
    async getUserInfo() {
      try {
        this.loading = true
        const res = await getUserApi()
        this.userInfo = res.data
      } finally {
        this.loading = false
      }
    }
  }
})
