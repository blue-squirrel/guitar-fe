<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style scoped lang="less">
.el-container {
  width: 100%;
  .el-header {
    width: 100%;
    background: #C3F8FF;
  }
  .el-main {
    background: #ABD9FF;
  }
  .el-footer {
    background: #FFF6BF;
  }
}
</style>
