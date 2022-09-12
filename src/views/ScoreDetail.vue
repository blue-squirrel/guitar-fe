<template>
  <div class="score-detail">
    <div class="score-detail-header">
      <el-button type="primary" @click="backHmoe">返回</el-button>666
    </div>
    <div class="score-detail-content">
      <div class="score-list">
        <div class="score-list-item">
          <img src="../../public/测试1.png" alt="">
        </div>
        <div class="score-list-item">
          <img src="../../public/测试2.png" alt="">
        </div>
        <div class="score-list-item">
          <img src="../../public/测试3.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
  },
  methods: {
    backHmoe() {
      window.history.back();
    }
  }
}
</script>

<style scoped lang="less">
.score-detail {
  height: 100vh;
  &-header {
    line-height: 50px;
    height: 50px;
    background: #C3F8FF;
  }
  &-content {
    .score-list {
      display: flex;
      &-item {
        width: 600px;
        height: 800px;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
</style>
