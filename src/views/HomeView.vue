<template>
  <el-container>
    <el-header>个人的吉他谱网站</el-header>
    <el-main>
      <el-button
        v-for="item in scoreList"
        :key="item"
        @click="goScoreDetail"
      >
        {{item}}
      </el-button>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
  export default {
    props: {
    },
    data() {
      return {
        scoreList: ['晴天', '成都', '情非得已']
      }
    },
    mounted() {
      console.log(`the component is now mounted.`)
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
