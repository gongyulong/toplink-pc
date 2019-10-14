<template>
  <div>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <!-- 内容区域 -->
      <el-form :model="form" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
    },
    // 发表或者修改文章
    publish (draft) {
      if (this.$route.path.indexOf('edit') !== -1) {
        // 修改文章
        this.editArticle(draft)
      } else {
        // 发表文章
        this.publistArticle(draft)
      }
    },
    // 发表文章逻辑代码
    publistArticle (draft) {
      this.$http({
        url: `/articles?draft=${draft}`,
        method: 'POST',
        data: {
          title: this.form.title,
          content: this.form.content,
          channel_id: this.form.channel_id,
          cover: {
            type: 1,
            images: ['http://toutiao.meiduo.site/Fhp5OXHbYJzUdd8pCJGjX4i9K_7y']
          }
        }
      }).then(res => {
        // console.log(res)
        // 成功提示消息
        if (res) {
          this.$message({
            message: draft === 'true' ? '成功存入草稿' : '发表成功',
            type: 'success'
          })
        }
        // 跳转到内容页
        this.$router.push('/article/list')
      })
    },
    // 得到要修改数据 id
    getEditId () {
      this.editId = this.$route.params.id
    },
    // 要根据 id 去服务器中得到 id 对象的数据
    getDatabyId () {
      this.$http({
        url: `/articles/${this.editId}`,
        method: 'GET'
      }).then(res => {
        // console.log(res)
        // 将返回的数据赋值给 ruleForm
        this.form = res
      })
    },
    // 修改文章逻辑代码
    editArticle (draft) {
      this.$http({
        url: `/articles/${this.editId}?draft=${draft}`,
        method: 'PUT',
        data: this.form
      }).then(res => {
        console.log(res)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        // 跳转到 list
        this.$router.push('/article/list')
      })
    }
  },
  created () {
    // 判断是否是编辑页面
    if (this.$route.path.indexOf('edit') !== -1) {
      this.getEditId()
      this.getDatabyId()
    }
  },
  // 频道组件
  components: {
    channleList // 频道组件
  },
  // 侦听器
  watch: {
    // 路由信息对象
    $route: function () {
      console.log('路由发送了跳转')
      if (this.$route.path.indexOf('publish') !== -1) {
        // 清除数据
        this.form = {
          title: '',
          content: '',
          channel_id: ''
        }
      }
    }
  }
}
</script>

<style >
.ql-container.ql-snow {
  height: 400px;
}
</style>
