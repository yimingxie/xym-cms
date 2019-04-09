<template>
  <div id="news-list">
    <h1>新闻列表</h1>
    <div class="news-content">
      <div class="news-box" v-for="item in list" @click="goDetail(item.id)">
        <h3>{{item.title}}</h3>
        <p>{{item.date}}</p>
        <p>{{item.paragraph}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {requestNewsList} from '../../api/news'

  export default {
    data () {
      return {
        list: []
      }
    },
    created() {
      this.getNewsList()
    },
    methods: {
      getNewsList() {
        requestNewsList().then(res => {
          console.log(res)
          this.list = res.newsList
        })
      },

      goDetail(id) {
        console.log(id)
      }

    }
  }
</script>

<style lang="scss" scoped>
  #news-list {
    .news-box {
      padding: 10px;
      border-bottom: 1px solid #000000;
      cursor: pointer;
    }
  }
</style>
