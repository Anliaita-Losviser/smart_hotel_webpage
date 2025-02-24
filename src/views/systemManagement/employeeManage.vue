<script setup>
import {login} from "@/api/employees.js";

const data = {
  username: 'admin',
  password: '123456',
}
const handlelogin = async ()=>{
  const res = await login(data)
  console.log(res)
}
</script>

<template>
    <div>
      <el-button @click="handlelogin">
        登陆
      </el-button>
    </div>
</template>

<style lang="scss" scoped>

</style>