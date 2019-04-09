<template>
  <div class="">
    <h1>权限测试</h1>
    <div class="clearfix">
      <p>首页</p>
      <p>关于我们</p>
      <p>编辑</p>
    </div>
  </div>
</template>

<script>
import cookie from '../utils/cookie'

export default {
  data() {
    return {
      role: ''
    }
  },
  mounted() {
    this.role = cookie.get('')

  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped>

</style>
