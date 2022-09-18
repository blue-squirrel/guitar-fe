<template>
  <el-container>
    <el-header>个人的吉他谱网站</el-header>
    <el-main>
      <el-button
        v-for="item in scoreList"
        :key="item"
        @click="goScoreDetail(item.id)"
      >
        {{item.title}}
      </el-button>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
import axios from 'axios';
import { reactive, onMounted, toRefs, computed } from 'vue';
export default {
  props: {
  },
  setup() {
    const state = reactive({
      scoreList: [{
        id: 1,
        title: '晴天'
      }]
    })

    onMounted(async () => {
      // todo
      state.scoreList = [];
      const res = await axios.get('/api/score/findAll');
      res.data.forEach(item => {
        state.scoreList.push({
          id: item.id,
          title: item.title
        });
      });
      console.log(res)
    })

    const goScoreDetail = (id: number) => {
      window.location.href = `/about?id=${id}`;
    }

    return {
      ...toRefs(state),
      goScoreDetail,
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
