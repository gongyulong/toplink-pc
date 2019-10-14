<template>
  <div>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <!-- 内容区域 -->
      <el-form :model="ruleForm"  status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题">
          <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="ruleForm.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <label>封面暂无</label>
        </el-form-item>
        <el-form-item label="频道">
          {{ ruleForm.channle_id }}
          <channleList @tofather="getValue" :mychannel="ruleForm.channle_id" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发表</el-button>
          <el-button>存入草稿</el-button>
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
      ruleForm: {
        title: '',
        content: '',
        channle_id: 2
      }
    }
  },
  methods: {
    getValue (value) {
      this.ruleForm.channle_id = value
    }
  },
  created () {},
  components: {
    channleList // 频道组件
  }
}
</script>

<style>
</style>
