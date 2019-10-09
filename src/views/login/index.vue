<template>
    <!-- 登录页面 -->
    <div class="login">
      <div class="login-warp">
        <!-- logo 区域 -->
        <div class="loginlogo">
          <img src="./img/login_logo.png" alt />
        </div>
        <!-- el-form: 管理所有表单元素的父容器  ref: vue 中提供的操作 dom 的方式 model: 表单元素的数据源 label-width： 描述文本的宽度 -->
        <el-form ref="form" :model="form" :rules="rules">
          <!-- el-form-item：表单域 label: 当前选项的描述文字 -->
          <el-form-item prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
          <!-- 行 -->
            <el-row>
              <!-- 列 -->
              <el-col :span="14">
                <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
              </el-col>
              <!-- 列 -->
              <el-col :span="8" :offset="2">
                <el-button class="colBtn" @click="getCode">获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item  prop="read" class="readPro">
            <el-checkbox v-model="form.read" name="type">
              我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
              <el-button class="loginbtn" type="primary" @click="login" :loading="loginloading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
// 导入axios
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        read: false
      },
      // 控制加载的显示
      loginloading: false,
      // 定义规则
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度必须为11', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度必须为6', trigger: 'blur' }
        ],
        read: [
          // 限制结果为 true: 正则
          // pattern: 设置一个正则规则
          // pattern: /true/ 只能匹配到结果为 true
          { pattern: /true/, message: '请先阅读用户协议', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 用户的登录
    login () {
      // 得到 el-form 元素
      // validate: 验证当前表单元素中所有的规则
      this.$refs['form'].validate(valid => {
        // 如果 valid 为 true 说明验证通过
        // 如果 valid 为 false 说明验证不通过
        if (valid) {
          this.submitData()
        } else {
          // 结束当前方法
        }
      })
    },
    // 数据的提交
    submitData () {
      // 发送请求前，将加载状态设置为 true
      this.loginloading = true
      axios({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        method: 'POST',
        data: this.form
      }).then(res => {
        // console.log(res)
        // 将加载状态设置为 false
        this.loginloading = false
        // 跳转到主页
        this.$router.push('/')
        // 这是一条成功消息提示
        this.$message({
          message: '登录成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        // 这是一条错误消息提示
        this.$message.error('手机号或验证码错误')
      })
    },
    // 验证手机号码是否存在
    getCode () {
      // 获取 form 表单
      // validateField(field, callback)
      // field: 要验证的字段
      // callback：验证后的回调函数
      this.$refs['form'].validateField('mobile', errMsg => {
        if (errMsg.trim().length > 0) {
          // 说明验证不通过
        } else {
          console.log('验证通过')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./img/login_bg.jpg") no-repeat center / cover;
  .login-warp {
    background-color: #fff;
    padding: 30px;
    min-width: 300px;
    min-width: 300px;
    .loginlogo {
      width: 150px;
      margin-bottom: 20px;
    }
    .loginbtn {
      width: 100%;
    }
    .colbtn {
      width: 100%;
    }
    .readPro a{
      text-decoration: none;
    }
  }
}
</style>
