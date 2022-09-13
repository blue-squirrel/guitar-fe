<template>
  <div class="score-detail">
    <div class="score-detail-header">
      <el-button type="primary" @click="backHmoe">返回</el-button>666
      <el-select v-model="pageSize" class="m-2">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="score-detail-content">
      <div class="score-list" :style="{'width': scoreWidth + 'px'}">
        <div class="score-list-item" :style="{'width': scoreItemWidth + 'px'}">
          <img src="../../public/测试1.png" alt="">
        </div>
        <div class="score-list-item" :style="{'width': scoreItemWidth + 'px'}">
          <img src="../../public/测试2.png" alt="">
        </div>
        <div class="score-list-item" :style="{'width': scoreItemWidth + 'px'}">
          <img src="../../public/测试3.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, toRefs, computed } from 'vue';
import { useRouter } from 'vue-router';
export default {
  props: {
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      pageSize: 2,
      options: [
        {
          value: 1,
          label: '1页显示',
        },
        {
          value: 2,
          label: '2页显示',
        },
        {
          value: 3,
          label: '3页显示',
        },
        {
          value: 4,
          label: '4页显示',
        }
      ],
      scoreLength: 3,
      webWidth: 1000,
      webHeight: 1000
    })

    let scoreItemWidth = computed(() => {
        return state.webWidth / state.pageSize;
    });

    let scoreWidth = computed(() => {
        return (state.webWidth / state.pageSize) * state.scoreLength;
    });

    onMounted(async () => {
      state.webWidth = document.body.clientWidth;
      state.webHeight = document.body.clientHeight;
      console.log(document.body.clientWidth, state.webWidth)
    })

    const backHmoe = () => {
      window.history.back();
    }

    return {
      ...toRefs(state),
      scoreItemWidth,
      scoreWidth,
      backHmoe
    }
  }
}
</script>

<style scoped lang="less">
.score-detail {
  &-header {
    line-height: 50px;
    height: 50px;
    background: #C3F8FF;
  }
  &-content {
    overflow: hidden;
    .score-list {
      display: flex;
      &-item {
        position: relative;
        height: calc(100vh - 50px);
        padding-left: 5px;
        padding-right: 5px;
        border: 1px solid #000;
        img {
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
