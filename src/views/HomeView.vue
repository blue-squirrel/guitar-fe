<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <!-- <main>
    <TheWelcome />
  </main> -->
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.el-container {
  width: 100%;
  .el-header {
    width: 100%;
  }
  .el-main {
    width: 1280px;
  }
}
</style>
