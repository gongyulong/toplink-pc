<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <layoutasider/>
      </el-aside>
      <el-container>
        <el-header>
          <layoutheader/>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入两个布局组件
import layoutheader from '@/views/layout/components/layoutHeader'
import layoutasider from '@/views/layout/components/layroutAsider'
export default {
  components: {
    layoutasider,
    layoutheader
  }
}
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  // &去掉选择器空格 >子代选择器
  & > .el-container {
    height: 100%;
  }
}
.el-aside {
  background-color: #323745;
  color: #333;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
}
.el-main {
  background-color: #eee;
  color: #333;
}
</style>
