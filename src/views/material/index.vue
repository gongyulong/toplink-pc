<template>
  <!-- 卡片容器 -->
  <!-- 标题 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>图片管理</span>
    </div>
    <!--上传素材按钮 -->
    <div class="itemBtn">
      <div class="items">
        <el-radio-group v-model="myradio" size="mini" @change="changeStatus">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="upload">
        <el-button type="primary" @click="uploadMat">上传素材</el-button>
      </div>
    </div>
    <!-- 图片素材放置容器 -->
    <el-row :gutter="30">
      <!-- 一行 -->
      <el-col :span="6" v-for="(item, index) in matericalList" :key="index">
        <!-- 一列 -->
        <el-card class="mycard">
          <!-- 图片 -->
          <img class="myimg" :src="item.url" />
          <div class="mybtns">
            <el-button
              type="text"
              v-if="item.is_collected === false"
              @click="getCollect(true, item.id)"
            >
              <!-- 空心：未收藏 -->
              <i class="el-icon-star-off"></i>
            </el-button>
            <el-button
              type="text"
              v-if="item.is_collected === true"
              @click="getCollect(false, item.id)"
            >
              <!-- 实心：已收藏 -->
              <i class="el-icon-star-on"></i>
            </el-button>
            <el-button type="text" @click="delMsg(item.id)">
              <!-- 删除图标 -->
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 上传弹出面板 -->
    <el-dialog title="上传图片" :visible.sync="centerDialogVisible">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name="image"
        :headers="headers"
        :show-file-list="false"
        :on-success="uploadsuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closePanle">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 分页栏 -->
    <el-pagination
      background
      :total="totalCount"
      layout="prev, pager, next"
      @prev-click="prevClick"
      @next-click="nextClick"
      @current-change="pageChange"
    ></el-pagination>
  </el-card>
</template>

<script>
let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      myradio: '全部',
      matericalList: [],
      // 控制面板的显示和隐藏
      centerDialogVisible: false,
      // 上传组件中的图片地址
      imageUrl: '',
      // 上传的请求头
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
      // 总条数
      totalCount: 0,
      // 分页页码
      page: 1,
      // 每一页条数
      per_page: 20
    }
  },
  methods: {
    // 获取图片素材
    // collect: true 收藏的数据 false 全部的数据
    getMatericalList (collect) {
      this.$http({
        url: '/user/images',
        methods: 'GET',
        params: {
          collect: collect
        }
      }).then(res => {
        // console.log(res)
        this.matericalList = res.results
        this.totalCount = res.total_count
      })
    },
    // 给全部&收藏按钮添加 change 事件
    changeStatus (params) {
      if (this.params === '全部') {
        // 加载全部数据
        this.getMatericalList(false)
      } else {
        // 加载收藏数据
        this.getMatericalList(true)
      }
    },
    // 给收藏按钮添加点击事件
    getCollect (collect, id) {
      this.$http({
        url: `/user/images/${id}`,
        method: 'PUT',
        data: {
          collect: collect
        }
      }).then(res => {
        // console.log(res)
        // 成功提示消息
        this.$message({
          message: res.collect ? '收藏成功' : '取消收藏成功',
          type: 'success'
        })
        // 重新加载数据
        console.log(this.myradio)
        if (this.myradio === '全部') {
          // 加载全部数据
          this.getMatericalList(false)
        } else {
          // 加载收藏数据
          this.getMatericalList(true)
        }
      })
    },
    // 删除图片素材
    delMsg (id) {
      this.$http({
        url: `/user/images/${id}`,
        method: 'DELETE'
      }).then(res => {
        // console.log(res) //返回null
        // 提示用户删除成功
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        // 刷新数据
        // console.log (this.myradio)
        if (this.myradio === '全部') {
          this.getMatericalList(false)
        } else {
          this.getMatericalList(true)
        }
      })
    },
    // 上传图片素材
    uploadMat () {
      // 控制面板的显示
      this.centerDialogVisible = true
    },
    // 当上传图片成功后触发
    uploadsuccess (response, file, fileList) {
      this.imageUrl = response.data.url
    },
    // 关闭面板时触发
    closePanle () {
      // 先关闭
      this.centerDialogVisible = false
      // 上传成功提示
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      // 再刷新数据
      this.getMatericalList(false)
    },
    // 分页功能
    // 用户点击上一页按钮改变当前页后触发
    prevClick () {
      this.page = this.page - 1
      this.getMatericalList(false)
    },
    // 用户点击下一页按钮改变当前页后触发
    nextClick () {
      this.page = this.page + 1
      this.getMatericalList(false)
    },
    // currentPage 改变时会触发
    pageChange (page) {
      // console.log('当前页码' + page)
      this.page = page
      this.getMatericalList(false)
    }
  },
  created () {
    this.getMatericalList()
  }
}
</script>

<style lang='less' scoped>
.itemBtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mycard {
  .myimg {
    width: 100%;
    height: 150px;
  }
  .mybtns {
    display: flex;
    justify-content: space-around;
    i {
      font-size: 20px;
    }
  }
}
.el-pagination.is-background {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload.el-upload--text {
  border: 1px dashed #ccc;
}
</style>
