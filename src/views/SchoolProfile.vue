<template>
  <v-content>
    <v-row>
      <v-col>
        <h1>{{ school.name }}</h1>
        <h3>{{ `${school.city}, ${school.board}` }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ActivityList :school="this.school" />
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import { db } from '@/services/firebase.js'
import ActivityList from '@/components/ActivityList'
export default {
  components: {
    ActivityList
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      categories: [
        'consultation',
        'education',
        'encouragement',
        'enforcement',
        'evaluation',
        'engineering'
      ],
      school: {}
    }
  },
  firestore() {
    return {
      school: {
        ref: db.collection('schoolData'),
        objects: true,
        resolve: data => {
          this.school = data[this.slug]
        },
        reject: err => {
          console.log('error fetching school from firestore', err)
        }
      },
      gold: db.collection('rankingInfo').doc('gold')
    }
  },
  computed: {
    percentComplete(activities, category) {
      if (activities) {
        let totalPoints = 0
        Object.keys(activities).forEach(activity => {
          if (activity.complete) {
            console.log(activity)
            totalPoints += activity.points
          }
        })
        console.log(totalPoints, '/', this.gold[category])
      }
      return null
    }
  },
  methods: {
    completeIcon(activity) {
      if (activity.complete) {
        return 'mdi-check'
      } else {
        return 'mdi-close'
      }
    },
    completeColor(activity) {
      if (activity.complete) {
        return 'success'
      } else {
        return '#F44336'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
