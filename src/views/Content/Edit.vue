<script setup>
import { ref, watch, defineEmits } from 'vue'
import * as api from '@/api/content'
import { regions } from '@/views/Content/utils.js'

const props = defineProps({
  id: {
    type: Number,
    default: null
  }
})
// do not use same name with ref
const form = ref({
  name: '',
  region: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
const loading = ref(false)
const emits = defineEmits(['getList'])
watch(() => props.id, () => {
  onReset()
})
const getDetail = async () => {
  if (!props.id) return
  loading.value = true
  try {
    const res = await api.getDetailApi(props.id)
    console.log(res)
    form.value = {
      ...res.data,
      type: res.data.type?.split(',') || [],
      delivery: !!res.data.delivery
    }
  } finally {
    loading.value = false
  }
}
const onSubmit = async () => {
  loading.value = true
  try {
    if (props.id) {
      await api.updateApi(props.id, form.value)
    } else {
      await api.createApi(form.value)
    }
  } finally {
    loading.value = false
    emits('getList')
  }
}
const onReset = () => {
  if (!props.id) {
    form.value = {
      name: '',
      region: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    }
  }
  getDetail()

}
</script>

<template>
  <el-form :model="form" label-width="auto" v-loading="loading">
    <el-form-item label="Activity name">
      <el-input v-model="form.name" placeholder="Please input your name" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option v-for="item in regions" :key="item.value"  :value="item.value" :label="item.label"/>
      </el-select>
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox value="Online activities" name="type">
          Online activities
        </el-checkbox>
        <el-checkbox value="Promotion activities" name="type">
          Promotion activities
        </el-checkbox>
        <el-checkbox value="Offline activities" name="type">
          Offline activities
        </el-checkbox>
        <el-checkbox value="Simple brand exposure" name="type">
          Simple brand exposure
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio value="Sponsor">Sponsor</el-radio>
        <el-radio value="Venue">Venue</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{id?'Update':'Create'}}</el-button>
      <el-button @click="onReset">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="less">

</style>
