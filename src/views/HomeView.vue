<template>
  <el-container>
    <el-header>
      个人的吉他谱网站
    </el-header>
    <el-main>
      <el-card
        type="primary"
        shadow="always"
        v-for="item in scoreList"
        :key="item"
        @click="goScoreDetail(item.id)"
      >
        {{item.title}}
      </el-card>
    </el-main>
    <el-footer>
      <el-button
        type="primary"
        @click="uploadShow = true"
      >
        上传曲谱
      </el-button></el-footer>
  </el-container>
  <el-dialog
    v-model="uploadShow"
    title="上传曲谱"
    width="30%"
  >
    <el-form
      :model="scoreData"
      :rules="rules"
      label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="scoreData.title" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="scoreData.author" />
      </el-form-item>
      <el-form-item>
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          multiple
          action="#"
          :on-progress="fileChange"
        >
          <el-button type="primary">点击上传曲谱</el-button>
          <template #tip>
            <div class="el-upload__tip">
              
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="uploadShow = false">取消</el-button>
        <el-button type="primary"
          @click="handleUpload">
          完成
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import axios from 'axios';
import { reactive, ref, onMounted, toRefs, computed } from 'vue';
import { ElMessage  } from 'element-plus';
import { uploadCos } from '../util';
export default {
  props: {
  },
  setup() {
    const state = reactive({
      scoreList: [{
        id: 1,
        title: '晴天'
      }],
      uploadShow: false,
      scoreData: {
        title: '',
        author: '',
        scoreUrl: ''
      },
      fileList: [],
      rules: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' },
        ],
        scoreUrl: [
          { required: true, message: '请上传曲谱文件', trigger: 'blur' },
        ]
      }
    })

    onMounted(async () => {
      // todo
      state.scoreList = [];
      const res = await axios.get('/api/score/findAll');
      res.data.forEach((item: any) => {
        state.scoreList.push({
          id: item.id,
          title: item.title
        });
      });
    })

    const goScoreDetail = (id: number) => {
      window.location.href = `/about?id=${id}`;
    }

    const fileChange = async (event, file, files) => {
      try {
        const res = await uploadCos(file.raw, file.name);
        const reg = /\/.+/;
        const url = res.Location.match(reg)[0];
        state.fileList = [...state.fileList, {name: file.name, value: url}];
        state.scoreData = {
          ...state.scoreData,
          scoreUrl: state.fileList.map(item => item.value).join(',')
        };
      } catch (error) {
        console.error(error);
      }
    }

    const handleUpload = async () => {
      try {
        const res = await axios.post('/api/score/upload', state.scoreData);
        state.uploadShow = false;
      } catch (error) {
        ElMessage.error('上传失败，请重新检查');
        console.error(error);
      }
    }

    return {
      ...toRefs(state),
      goScoreDetail,
      fileChange,
      handleUpload,
    }
  }
}
</script>

<style scoped lang="less">
.el-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .el-header {
    width: 100%;
    line-height: 60px;
    background: #fff;
    font-weight: 600;
    font-size: 18px;
  }
  .el-main {
    flex: 1;
    background: #f7f7f7;
    display: flex;

    .el-card {
      height: 80px;
      margin-right: 20px;
      // line-height: 100px;
      cursor: pointer;
    }
  }
  .el-footer {
    line-height: 60px;
    background: #fff;
  }
}
</style>
