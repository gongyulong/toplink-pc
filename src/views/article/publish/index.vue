<template>
  <div>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <!-- 内容区域 -->
      <el-form :model="form"  status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor v-model="form.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <label>封面暂无</label>
        </el-form-item>
        <el-form-item label="频道">
          <!-- {{ form.channel_id }} -->
          <channleList @sendMsg="getValue" :channelId="form.channel_id" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publish('false')">发表</el-button>
          <el-button @click="publish('true')">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入频道组件
import channleList from '@/components/channles'

export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        channel_id: 3
      }
    }
  },
  methods: {
    // 子组件向父组件传参
    getValue (value) {
      this.form.channel_id = value
    }
  },
  components: {
    channleList // 频道组件
  }
}
</script>

<style >
.ql-container.ql-snow {
  height: 400px;
}
</style>
