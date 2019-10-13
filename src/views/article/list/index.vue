<template>
  <div>
    <!-- 顶部搜索选项区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <!-- 添加一些 form 表单 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-checkbox-group v-model="form.type">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model="form.channelid" placeholder="请选择活动区域">
            <el-option v-for="(item,index) in channelsList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章显示区域 -->
    <el-card class="box-card mycard">
      <div slot="header" class="clearfix">
        <span>共找到{{ totalCount }}条符合条件的内容</span>
      </div>
      <!-- 表格区域 -->
      <!-- el-table: 表格组件 data：指定表格的数据源 -->
      <el-table :data="dataList" style="width: 100%" :stripe="true" :border="true" v-loading="loading">
        <el-table-column label="图片" width="180">
          <!-- scope.row 是当前行的数据源 -->
          <template slot-scope="scope">
            <img class="myimg" :src="scope.row.cover.images[0]" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">草稿</span>
            <span v-if="scope.row.status === 1">待审核</span>
            <span v-if="scope.row.status === 2">审核通过</span>
            <span v-if="scope.row.status === 3">审核失败</span>
            <span v-if="scope.row.status === 4">已删除</span>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" round>
              <i class="el-icon-edit" ></i>修改
            </el-button>
            <el-button size="mini" round  @click="delArticle(scope.row.id)">
              <i class="el-icon-delete"></i>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        @prev-click="prevClick"
        @next-click="nextClick"
        @current-change="pageChange"
        :disabled="loading"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// 获取token(请求拦截器中已经获取)
// let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      form: {
        channelid: '',
        resource: ''
      },
      // 保存文章列表数据
      dataList: [],
      // 文章的总条数
      totalCount: 0,
      // 分页页码
      page: 1,
      // 每一页条数
      per_page: 20,
      // 控制表格的加载效果
      loading: false,
      // 得到频道的数据源
      channelsList: []
    }
  },
  methods: {
    // 打开页面,请求文章列表的数据
    getArticleList () {
      // 开启加载动画
      this.loading = true
      setTimeout(() => {
        // 这个请求如果不带 token 返回 401
        this.$http({
          url: '/articles',
          methods: 'get',
          // axios发送请求 中使用请求拦截器动态设置 token
          // headers: {
          //   Authorization: `Bearer ${userInfo.token}`
          // }
          params: {
            page: this.page,
            per_page: this.per_page,
            status: 0,
            channel_id: 3
          }
        })
          .then(res => {
            // console.log(res);
            // 将数据源保存到 dataList 中
            // this.dataList = res.data.data.results

            // 响应拦截器--》处理响应数据  res.data.data
            this.dataList = res.results
            // console.log(this.dataList);

            // 数据的总条数进行保存
            // this.totalCount = res.data.data.total_count
            this.totalCount = res.total_count
            // 关闭加载动画
            this.loading = false
          })
          .catch(err => {
            console.log(err)
          })
      }, 1000)
    },
    // 用户点击上一页按钮改变当前页后触发
    prevClick () {
      this.page = this.page - 1
      this.getArticleList()
    },
    // 用户点击下一页按钮改变当前页后触发
    nextClick () {
      this.page = this.page + 1
      this.getArticleList()
    },
    // currentPage 改变时会触发
    pageChange (page) {
      // console.log('当前页码' + page)
      this.page = page
      this.getArticleList()
    },
    // 删除文章列表数据
    delArticle (id) {
      this.$http({
        url: `/articles/${id}`,
        methods: 'DELETE'
      }).then(res => {
        console.log(res)
      })
    },
    // 获取频道数据
    getChannels () {
      // 请求服务器得到数据
      this.$http({
        url: '/channels',
        method: 'GET'
      }).then(res => {
        console.log(res)
        this.channelsList = res.channels
      })
    }
  },
  created () {
    this.getArticleList()
    this.getChannels()
  }
}
</script>

<style leang='less' scoped>
.mycard {
  margin-top: 20px;
}

.myimg {
  width: 150px;
  height: 100px;
}
</style>
