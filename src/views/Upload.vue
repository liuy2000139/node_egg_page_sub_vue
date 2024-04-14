<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue"
const input = ref<any>(null)
const getUrl = ref<any>(null)

const onChange = () => {
  const file = input?.value?.files?.[0]
  const blobUrl = URL.createObjectURL(file);
  getUrl.value?.(blobUrl)
}

onMounted(() => {
  const $qiankun = getCurrentInstance()!.appContext.app.config.globalProperties.$qiankun
  getUrl.value = $qiankun?.getUrl
})

</script>

<template>
  <main>
    <input type="file" @change="onChange" ref="input" accept="image/png, image/jpeg">
  </main>
</template>

<style scoped lang="less">
main {
  display: flex;
  align-items: center;
}
input {
  font-size: 16px;
}
img {
  width: 27px;
  height: 27px;
  object-fit: contain;
  margin-right: 12px;
}
</style>
