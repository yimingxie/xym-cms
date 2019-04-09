<template>
  <div id="pie-chart">
    <h1>饼图</h1>
    <div id="pie-chart1" style="width: 800px;height: 600px;"></div>
  </div>
</template>

<script>
  import {lineChart} from '../../api/chart'

  export default {
    data () {
      return {}
    },
    mounted () {
      this.drawPie1()
    },
    methods: {
      // 绘制饼图
      drawPie1 () {
        lineChart().then(res => {
          let data = []
          res.result.forEach((item, i) => {
            let singleData = {
              name: item.type,
              value: item.num
            }
            data.push(singleData)
          })
          console.log(data)

          let pieChart1 = this.$echarts.init(document.getElementById('pie-chart1'))
          let option = {
            backgroundColor: '#2c343c',

            title: {
              text: 'Customized Pie',
              left: 'center',
              top: 20,
              textStyle: {
                color: '#ccc'
              }
            },

            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1]
              }
            },
            series : [
              {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data: data,
                roseType: 'radius',
                label: {
                  normal: {
                    textStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  }
                },
                itemStyle: {
                  color: 'red',
                  shadowBlur: 200,
//                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200;
                }
              }
            ]
          };
          pieChart1.setOption(option)

        })
      }
    }
  }
</script>

<style scoped>

</style>
