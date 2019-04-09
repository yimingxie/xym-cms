<template>
  <div id="home">
    <div class="home-main clearfix">
      <div class="side-nav">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/home/content">
            <i class="el-icon-menu"></i>
            <span slot="title">概况</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>图表</span>
            </template>
            <el-menu-item index="/charts/line-chart">线图</el-menu-item>
            <el-menu-item index="/charts/pie-chart">饼图</el-menu-item>
            <el-menu-item index="2-3">柱状图</el-menu-item>
          </el-submenu>

          <el-menu-item index="/news">
            <i class="el-icon-document"></i>
            <span slot="title">新闻</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="content">
        <div class="content-breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in breadlist"
              :key="index"
              :to="{path: item.path}"
            >{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <router-view></router-view>

        <div>{{$store.state.num}}</div>
        <button @click="submit">{{text}}</button>
        <button @click="$store.commit('add')">改变st -- {{$store.state.num}}</button>
        <button @click="test">测试</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 5,
      text: "发送短信验证码",
      canClick: true,
      crumbs: ["11", "35131"],
      breadlist: ""
    };
  },
  created() {
    this.getBread();
  },
  mounted() {},
  methods: {
    submit() {
      if (!this.canClick) return;
      this.canClick = false;
      let clock = window.setInterval(() => {
        this.time--;
        this.text = this.time + "s后重新发送";
        if (this.time < 0) {
          window.clearInterval(clock);
          this.text = "重新发送验证码";
          this.time = 60;
          this.canClick = true;
        }
      }, 1000);
    },
    handleOpen() {},
    handleClose() {},
    test() {
      this.crumbs = this.$route.meta.routeList;
    },
    getBread() {
      this.breadlist = this.$route.matched;
      console.log(this.breadlist);
      //        this.$route.matched.forEach((item, index) => {
      //          //先判断父级路由是否是空字符串或者meta是否为首页，直接复写路径到根路径
      //          item.meta.name === 'home' ? item.path = '/' : this.$route.path === item.path;
      //        })
    }
  },
  watch: {
    $route() {
      this.getBread();
    }
  }
};
</script>

<style>
</style>
<style lang="scss" scoped>
#home {
  .side-nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;
    background-color: rgb(84, 92, 100);
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-menu {
    border-right: 0;
  }
  .content {
    margin-left: 200px;
  }
  .content-breadcrumb {
    padding: 10px;
  }
}
</style>
