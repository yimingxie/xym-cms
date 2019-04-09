<template>
  <div id="line-chart">
    <h1>线图</h1>
    <div id="line-chart1" style="width: 600px;height:400px;"></div>

  </div>
</template>

<script>
  import {lineChart} from '../../api/chart'

  export default {
    data () {
      return {

      }
    },
    mounted () {
      this.drawLine1()
    },
    methods: {

      // 绘制折线图
      drawLine1 () {
        lineChart().then(res => {
          let x = []
          let value = []
          res.result.forEach((item, i) => {
            x.push(item.type)
            value.push(item.num)
          })

          let lineChart1 = this.$echarts.init(document.getElementById('line-chart1'))
          let options = {
            title: {
              text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
              data: ['销量']
            },
            xAxis: {
              data: x
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'line',
              data: value
            }]
          };
          lineChart1.setOption(options)
        })
      }


    }
  }
</script>

<style></style>
