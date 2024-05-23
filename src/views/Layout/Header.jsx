import {watchEffect, defineComponent, computed } from 'vue'
import { useUser }from '@/stores/user.js'
export default defineComponent(
  () => {
    const userStore = useUser()
    const loading = computed(() =>userStore.loading)
    const userInfo = computed(() => userStore.userInfo)
    watchEffect(() => {
      if (!userInfo.value) {
        userStore.getUserInfo()
      }
    }, [userInfo.value])
    return () => {
      return <div class="flex items-center justify-between h-60px ">
        <div class={'font-size-24px'}>LOGOOO</div>
        <div class={'flex items-center gap-col-10px color-#666'} v-loading={loading.value}>
          <span>{userInfo?.value?.name}</span>
          <el-avatar size={36} src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </div>
      </div>
    }
  }
)
