<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import * as api from '@/api/content'

defineProps({
  id: {
    type: Number,
    default: null
  }
})
const emits = defineEmits(['update:id'])
const tableData = [
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const formRef = ref(null)
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
    console.log(res)
  } finally {
    loading.value = false
  }
}

const onSubmit = () => {
  if (!formRef.value) return
  page.value = 1
  getList()
}
const onReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
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

</script>

<template>
  <div v-loading="loading">
    <el-form :model="form" label-width="50px" ref="formRef" :inline="true">
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
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="Address" />
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
