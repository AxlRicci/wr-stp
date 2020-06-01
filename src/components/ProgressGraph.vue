<template>
  <div>
    <highcharts :options="chartOptions"> </highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'

export default {
  components: {
    highcharts: Chart
  },
  props: {
    school: {
      type: Object,
      required: true
    },
    gold: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: [
            'Consultation',
            'Education',
            'Encouragement',
            'Enforcement',
            'Evaluation'
          ]
        },
        yAxis: {
          title: {
            text: 'Progress to gold (%)'
          }
        },
        series: [
          {
            name: '',
            data: [] // sample data
          }
        ]
      }
    }
  },
  watch: {
    school: function() {
      this.pointProgress()
    },
    gold: function() {
      this.pointProgress()
    }
  },
  methods: {
    pointProgress() {
      if (this.gold) {
        let dataset = []
        this.chartOptions.xAxis.categories.forEach(cat => {
          if (cat !== '.key') {
            let catName = `${cat.toLowerCase()}Score`
            let calc = Math.floor(
              (this.school[catName] / this.gold[cat.toLowerCase()]) * 100
            )
            dataset.push(calc)
          }
        })
        this.chartOptions.series[0].data = dataset
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
