<template>
  <!-- 使用 ElementUI -->
  <div class="useElement">
    <h3>
        这是使用 element-ui 的测试页面
    </h3>
    <h4>
        使用 element-ui 中的按钮
    </h4>
   <el-button type="success" round>成功按钮</el-button>
    <h4>使用 element-ui 中的开关</h4>
    <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949">
    </el-switch>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: true
    }
  }
}
</script>
<style>
</style>
