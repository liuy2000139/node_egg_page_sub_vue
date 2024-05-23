<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './Header.jsx'
</script>

<template>
  <el-container>
    <ElHeader class="b-b-1px b-b-#ccc b-b-solid">
      <Header></Header>
    </ElHeader>
    <el-container class="h-[calc(100vh-60px)]">
      <el-aside width="200px" class="b-r-1px b-r-#ccc b-r-solid">Aside</el-aside>
      <el-container>
        <el-main>
          <RouterView />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>

</template>

<style scoped lang="less">

</style>
