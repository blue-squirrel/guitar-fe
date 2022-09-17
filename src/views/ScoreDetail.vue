<template>
  <div class="score-detail">
    <div v-if="!isFullScreen" class="score-detail-header">
      <el-button class="back" type="primary" @click="backHmoe">返回</el-button>
      <el-button class="full" type="primary" @click="openFullScreen">全屏模式</el-button>
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
      <div class="pagination">
        <el-icon
          class="pagination-left"
          :class="{disabled: prevDisabled}"
          size="30px"
          color="#fff"
          @click="goPrev"
        ><ArrowLeft /></el-icon>
        <el-icon
          class="pagination-right"
          :class="{disabled: nextDisabled}"
          size="30px"
          color="#fff"
          @click="goNext"
        ><ArrowRight /></el-icon>
      </div>
      <div
        class="score-list"
        :style="{
          'width': scoreWidth + 'px',
          'margin-left': transLen * scoreItemWidth + 'px'
        }">
        <div class="score-list-item"
          :class="{'full-screen': isFullScreen}"
          :style="{'width': scoreItemWidth + 'px'}">
          <img src="../../public/测试1.png" alt="">
        </div>
        <div v-if="scoreLength > 1" class="score-list-item"
          :class="{'full-screen': isFullScreen}"
          :style="{'width': scoreItemWidth + 'px'}">
          <img src="../../public/测试2.png" alt="">
        </div>
        <div v-if="scoreLength > 2" class="score-list-item"
          :class="{'full-screen': isFullScreen}"
          :style="{'width': scoreItemWidth + 'px'}">
          <img src="../../public/测试3.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, toRefs, computed } from 'vue';
import { useRouter } from 'vue-router';
import screenfull from 'screenfull';
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
      scoreLength: Math.ceil((Math.random() * 5)),
      webWidth: 1000,
      webHeight: 1000,
      transLen: 0,
      isFullScreen: false
    })

    // 单页宽度
    let scoreItemWidth = computed(() => {
        return state.webWidth / state.pageSize;
    });

    // 总宽度
    let scoreWidth = computed(() => {
        return (state.webWidth / state.pageSize) * state.scoreLength;
    });

    // 上一页禁用
    let prevDisabled = computed(() => {
        return state.transLen >= 0;
    });

    // 下一页禁用
    let nextDisabled = computed(() => {
      return (Math.abs(state.transLen) + state.pageSize >= state.scoreLength)
        || state.scoreLength <= 1;
    });

    const handler = () => {
      let isFullscreen = document.fullscreenElement !== null;
      if (!isFullscreen) {
        // 退出全屏时候解除监听，不然每次监听都会添加一次绑定 
        document.removeEventListener("fullscreenchange", handler);
      }
    };

    const openFullScreen = () => {
      if (!screenfull.isEnabled) {
        console.error('你的浏览器暂不支持全屏');
        return false
      }
      screenfull.request();
    };

    onMounted(() => {
      if (screenfull.isEnabled) {
	      screenfull.on('change', () => {
          screenfull.isFullscreen && (state.isFullScreen = true);
          !screenfull.isFullscreen && (state.isFullScreen = false);
        });
      }

      state.webWidth = document.body.clientWidth;
      state.webHeight = document.body.clientHeight;

      state.options = [];
      for (let i = 1; i <= state.scoreLength; i++) {
        state.options.push({
          value: i,
          label: i + '页显示'
        });
      }

      if (state.options.length < 2) {
        state.pageSize = 1;
      }
    })

    const backHmoe = () => {
      window.history.back();
    }

    // 上一页
    const goPrev = () => {
      if (prevDisabled.value) {
        return;
      }

      // 下一页
      state.transLen++;
    }

    const goNext = () => {
      if (nextDisabled.value) {
        return;
      }

      state.transLen--;
    }

    return {
      ...toRefs(state),
      scoreItemWidth,
      scoreWidth,
      prevDisabled,
      nextDisabled,
      backHmoe,
      openFullScreen,
      goPrev,
      goNext
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

    button {
      margin-left: 0;
      margin-right: 20px;

      &.back {
        margin-left: 20px;
      }
    }
  }
  &-content {
    overflow: hidden;
    position: relative;

    .pagination {
      position: absolute;
      z-index: 1;
      left: 50%;
      bottom: 5%;
      transform: translate(-50%);

      &-left, &-right {
        background: rgba(0, 0, 0, .4);
        border-radius: 50%;
        width: 60px;
        height: 60px;
        cursor: pointer;

        &.disabled {
          background: rgba(0 , 0, 0, .1);
        }
      }

      &-left {
        margin-right: 50px;
      }

      &-right {
        margin-left: 50px;
      }

      // &-right {
      //   background: #000;
      // }
    }
    .score-list {
      display: flex;
      transition: all .35s;
      &-item {
        position: relative;
        height: calc(100vh - 50px);
        padding-left: 5px;
        padding-right: 5px;
        
        &.full-screen {
          height: 100vh;
        }
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
