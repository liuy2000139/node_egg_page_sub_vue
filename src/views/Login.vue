<script setup >
import { reactive, ref } from 'vue'
import { ElLoading, ElMessage } from 'element-plus'
import { loginApi, registerApi } from '@/api/user.js'
import { setItem } from '@/utils/storage.js'
import { AUTH_TOKEN } from '@/utils/contant.js'
import useRouter from '@/hooks/router.js'
// do not use same name with ref
const form = reactive({
  name: '123',
  password: '123',
  rePassword: ''
})
const ruleFormRef = ref()

const router = useRouter()


const onSubmit = async () => {
  const loading = ElLoading.service()
  try {
    if (!ruleFormRef.value) return
    const valid = await ruleFormRef.value.validate()
    if (!valid) return
    if (activeName.value === 'login') {
      const res = await loginApi(form)
      ElMessage.success('Login success')
      setItem(AUTH_TOKEN, res.data)
      router.replace("/")
    } else {
      await registerApi(form)
      ElMessage.success('Register success, please login')
    }
  } finally {
    loading.close()
  }
}

const rules = ref({
  name: [
    { required: true }
  ],
  password: [
    { required: true }
  ],
  rePassword: [
    { required: true, message: 'Please input the password again', },
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error('The two passwords are inconsistent'))
        } else {
          callback()
        }
      }
    }
  ]
})

const activeName = ref('login')
</script>

<template>
  <el-form :model="form" label-width="auto" class="mt-20vh" :rules="rules" ref="ruleFormRef">
    <el-card class="max-w-400px mx-auto ">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="Login" name="login">

        </el-tab-pane>
        <el-tab-pane label="Register" name="register">

        </el-tab-pane>
      </el-tabs>
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="Re Password" prop="rePassword" v-if="activeName === 'register'">
        <el-input v-model="form.rePassword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="w-full">{{ activeName === 'login' ? 'Login' : 'Register' }}
        </el-button>
      </el-form-item>
    </el-card>

  </el-form>
</template>

<style scoped lang="less">

</style>
