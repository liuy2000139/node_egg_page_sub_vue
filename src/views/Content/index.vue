<script setup >
import List from './List.vue'
import Edit from './Edit.vue'
import { ref } from 'vue'

const currentId = ref(null)
</script>

<template>
<ElRow :gutter="20">
  <ElCol :span="12">
    <ElCard header="Creat">
      <Edit></Edit>
    </ElCard>
  </ElCol>
  <ElCol :span="12">
    <ElCard :header="`Edit（Current ID：${currentId}）`">
      <Edit :id="currentId"></Edit>
    </ElCard>
  </ElCol>
</ElRow>
  <ElRow :gutter="20" class="mt-20px">
    <ElCol :span="24">
      <ElCard>
        <List v-model:id="currentId"></List>
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<style scoped lang="less">

</style>
