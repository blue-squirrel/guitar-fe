<template>
  <el-container>
    <el-header>个人的吉他谱网站</el-header>
    <el-main>
      <el-button @click="goScoreDetail">成都</el-button>
      <el-button>晴天</el-button>
      <el-button>情非得已</el-button>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
  export default {
    props: {
    },
    methods: {
      goScoreDetail() {
        window.location.href = '/about';
      }
    }
  }
</script>

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
