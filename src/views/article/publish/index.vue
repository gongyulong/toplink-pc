<template>
  <div>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <!-- 内容区域 -->
      <el-form :model="form" status-icon ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor v-model="form.content"></quill-editor>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item label="封面">
          {{ form.cover.type }}
          <el-radio-group v-model="form.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 添加一个图片选择器 -->
          <div class="imgSelectBox" v-if="form.cover.type > 0">
            <div
              class="imgItem"
              @click="selectImg(index)"
              v-for="(item, index) in form.cover.type"
              :key="index"
            >
              <span>点击改变图片</span>
              <!-- 边框图片 -->
              <img
                class="myAdd"
                :src="form.cover.images[index] ? form.cover.images[index] :'https://static.easyicon.net/preview/120/1205626.gif'"
                alt
              />
            </div>
          </div>
          <!-- 选择图片的弹框面板 -->
          <el-dialog title="选择封面图片" :visible.sync="imgVisible">
            <!-- 使用tab 选项卡 -->
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="素材库" name="first">
                <!-- 选择全部&收藏单选框 -->
                <el-radio-group v-model="collectItem" @change="changeCollect">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="收藏"></el-radio-button>
                </el-radio-group>
                <!-- 遍历素材的数据源 -->
                <el-row>
                  <el-col :span="8" v-for="(item, index) in collectList" :key="index">
                    <!-- 点击选择获取当前素材图片url -->
                    <img
                      class="myimg"
                      :src="item.url"
                      @click="chooseImg(index, item.url)"
                      :class="{active: activeIndex === index}"
                      alt
                    />
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="上传图片" name="second">
                <!-- 上传组件 -->
                <el-upload
                  class="avatar-uploader"
                  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                  :headers="{Authorization: `Bearer ${$store.state.userInfo.token}`}"
                  name="image"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-tab-pane>
            </el-tabs>
            <!-- 面板底部确定、取消选择框 -->
            <div slot="footer" class="dialog-footer">
              <el-button @click="imgVisible = false">取 消</el-button>
              <el-button type="primary" @click="confrimImg">确 定</el-button>
            </div>
          </el-dialog>
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
        channel_id: 3,
        cover: {
          type: 1,
          images: []
        }
      },
      // 控制弹框的显示和隐藏
      imgVisible: false,
      // 设置选中的 tab
      activeName: 'first',
      // 选择的是全部&收藏
      collectItem: '全部',
      // 素材资源的数据源
      collectList: [],
      // 选中的图片的下标
      activeIndex: -1,
      // 图片选择器的下标
      selectedImgIndex: 0,
      // 图片选择器中选中的图片
      selectedImgUrl: '',
      // 上传成功后显示的图片地址
      imageUrl: ''
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
          cover: this.form.cover
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
      // 组件中-获取动态路由携带的id参数
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
    },
    // 封面逻辑代码--打开一个弹框
    selectImg (index) {
      this.imgVisible = true
      // index 表示当前点击图片选择器的下标
      this.selectedImgIndex = index
      // console.log(index)
    },
    // 获取用户图片素材
    getCollectList (collect) {
      this.$http({
        url: '/user/images',
        method: 'GET',
        params: {
          collect: collect
        }
      }).then(res => {
        // console.log(res)
        this.collectList = res.results
      })
    },
    // 切换全部&收藏
    changeCollect () {
      if (this.collectItem === '全部') {
        // 加载全部数据
        this.getCollectList(false)
        // 加载收藏数据
        this.getCollectList(true)
      }
    },
    // 点击素材图片,获取当前图片url
    chooseImg (index, url) {
      // console.log(index)
      this.activeIndex = index
      // console.log(url)
      this.selectedImgUrl = url
    },
    // 当点击弹框确定按钮,保存当前被点击图片url到images: []
    confrimImg () {
      // 关闭弹框面板
      this.imgVisible = false
      // 保存当前被点击图片url到images: []
      // selectedImgIndex  图片选择器的下标
      // console.log(this.form.cover)
      this.form.cover.images[this.selectedImgIndex] = this.selectedImgUrl
    },
    // 上传图片成功后的回调
    handleAvatarSuccess (response, file, fileList) {
      console.log(response)
      this.imageUrl = response.data.url
      this.selectedImgUrl = response.data.url
    }
  },
  created () {
    // 判断是否是编辑页面
    if (this.$route.path.indexOf('edit') !== -1) {
      this.getEditId()
      this.getDatabyId()
    }
    // 获取用户图片素材
    this.getCollectList()
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

<style lang='less' scoped>
.ql-container {
  height: 400px;
}
.imgSelectBox {
  display: flex;
  .imgItem {
    width: 200px;
    height: 200px;
    border: 1px solid skyblue;
    text-align: center;
    .myAdd {
      width: 150px;
      height: 150px;
    }
  }
}

.myimg {
  width: 150px;
  height: 150px;
  margin: 20px;
}

.active {
  border: 5px solid orangered;
  box-sizing: border-box;
}
</style>
