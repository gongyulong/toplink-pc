<template>
  <div class="appheader">
    <el-row>
      <el-col :span="14">我的头条号</el-col>
      <el-col :offset="7" :span="3">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo">
            <img class="icon" :src="userInfo.photo" />
            <span class="name">{{ userInfo.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" split-button>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item @click='userBack'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    userBack () {
      console.log('退出')
    }
  },
  created () {
    // 从 localstorage 中取出 userInfo
    // this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    // console.log(this.userInfo)
    // 从Vuex 中获取userInfo
    this.userInfo = this.$store.state.userInfo
  }
}
</script>
<style lang='less' scoped>
.userinfo {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
</style>
