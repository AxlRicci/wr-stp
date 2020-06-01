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
    schools: {
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
          text: 'School Ranking Breakdown'
        },
        xAxis: {
          categories: ['Explorer', 'Bronze', 'Silver', 'Gold']
        },
        yAxis: {
          title: {
            text: 'Number of Schools'
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
    schools: function() {
      this.schoolRankings()
    }
  },
  methods: {
    schoolRankings() {
      let ranks = {
        explorer: 0,
        bronze: 0,
        silver: 0,
        gold: 0
      }

      Object.keys(this.schools).forEach(school => {
        ranks[this.schools[school].overall.toLowerCase()] += 1
      })
      console.log(ranks)

      this.chartOptions.series[0].data = Object.keys(ranks).map(rank => {
        return ranks[rank]
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
