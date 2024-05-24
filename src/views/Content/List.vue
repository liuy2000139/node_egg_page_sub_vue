<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import * as api from '@/api/content'
import { formatDate } from '../../utils/index.js'
import { regions } from './utils.js'

defineProps({
  id: {
    type: Number,
    default: null
  }
})
const emits = defineEmits(['update:id'])
const tableData = ref([])
const page = ref(1)
const total = ref(0)
const loading = ref(false)
// do not use same name with ref
const form = reactive({
  name: '',
  region: ''
})

onMounted(() => {
  getList()
})

const getList = async () => {

  loading.value = true
  try {
    const params = {
      ...form,
      page: page.value,
      pageSize: 10
    }
    const res = await api.getListApi(params)
    total.value = res?.data?.count || 0
    tableData.value = res?.data?.rows || []
  } finally {
    loading.value = false
  }
}

const onSubmit = () => {
  page.value = 1
  getList()
}
const onReset = () => {
  form.name = ''
  form.region = ''
  page.value = 1
  getList()
}

const changePagination = (current) => {
  page.value = current
  getList()
}

const editItem = (id) => {
  emits('update:id', id)
}

const deleteItem = (id) => {
  ElMessageBox.confirm(
    'Are you sure to delete this item?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(async () => {
      loading.value = true
      try {
        await api.deleteApi(id)
        ElMessage({
          type: 'success',
          message: 'Delete completed'
        })
        getList()
      } finally {
        loading.value = false
      }

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

defineExpose({
  getList
})

</script>

<template>
  <div v-loading="loading">
    <el-form :model="form" label-width="50px" :inline="true">
      <el-form-item label="Name">
        <el-input v-model="form.name" placeholder="Please input your name" />
      </el-form-item>
      <el-form-item label="Zone" class="w-250px">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="onSubmit">Search</el-button>
        <el-button @click="onReset" size="default">Reset</el-button>
      </el-form-item>

    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"/>
      <el-table-column prop="name" label="Activity name" />
      <el-table-column prop="region" label="Activity zone" >
        <template #default="scope">
          <span>{{regions.find(v => v.value === scope.row.region)?.label || scope.row.region}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="delivery" label="Instant delivery" >
        <template #default="scope">
          <span>{{ scope.row.delivery ? 'Yes' : 'No'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="Activity type" >
        <template #default="scope">
          <ElSpace v-if="scope.row.type"><el-tag v-for="v in scope.row.type.split(',')" :key="v">{{ v }}</el-tag></ElSpace>
        </template>
      </el-table-column>

      <el-table-column prop="resource" label="Resources" />
      <el-table-column prop="type" label="Update Date" >
        <template #default="scope">
          <span>{{formatDate(scope.row.updateAt)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="Create Date" >
        <template #default="scope">
          <span>{{formatDate(scope.row.createAt)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Operations" width="180">
        <template #default="scope">
          <el-button type="primary" link @click="editItem(scope.row.id)">Edit</el-button>
          <el-button type="danger" link @click="deleteItem(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="page" layout="prev, pager, next" :total="total" class="mt-20px justify-end"
                   @change="changePagination" />
  </div>
</template>

<style scoped lang="less">

</style>
