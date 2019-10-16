<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户信息</span>
    </div>
    <el-row :gutter="40">
      <el-col :span="12">
        <el-form :model="user" status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="头条帐号">
            <el-input type="text" disabled v-model="user.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input type="text" disabled v-model="user.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input type="text" v-model="user.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="text" v-model="user.intro" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input type="text" v-model="user.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="updateUser">修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <!-- 可以自定义上传的实现 -->
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :http-request="uploadImg"
        >
          <img class="avatar" :src="user.photo" />
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$http({
        url: 'user/profile',
        method: 'GET'
      }).then(res => {
        // console.log(res)
        this.user = res
      })
    },
    // 修改用户信息
    updateUser () {
      this.$http({
        url: 'user/profile',
        method: 'PATCH',
        data: {
          name: this.user.name,
          intro: this.user.intro,
          photo: this.user.photo
        }
      }).then(res => {
        console.log(res)
        // 提示用户更新成功
        this.$message({
          message: '用户信息更新成功',
          type: 'success'
        })
        // 将信息更新到 vuex 中
        this.$store.commit('changeUserInfo', res)
      })
    },
    // 上传头像
    uploadImg (params) {
      // console.log(params)
      // axios ----> XMLHttpRequest ---> $.ajax
      // 默认是不支持图片的上传的
      // 如果要支持图片的上传，需要将参数通过 formDate
      // 将参数转为 formData 对象
      let fd = new FormData()
      fd.append('photo', params.file)
      // console.log(fd)
      this.$http({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/photo',
        method: 'PATCH',
        data: fd
      }).then(res => {
        // console.log(res)
        this.user.photo = res.photo
        this.$store.commit('changeUserInfoImg', res.photo)
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style>
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
</style>
