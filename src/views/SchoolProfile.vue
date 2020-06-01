<template>
  <v-container>
    <v-row justify="center">
      <v-spacer></v-spacer>
      <v-col>
        <h1 class="text-center">{{ school.name }}</h1>
        <h3 class="text-center">{{ `${school.city}, ${school.board}` }}</h3>
        <h4 class="text-center">
          Current Rank:
          {{
            school.overall
              ? school.overall.charAt(0) + school.overall.toLowerCase().slice(1)
              : null
          }}
        </h4>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col>
        <ProgressGraph :school="this.school" :gold="this.gold" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ActivityList :school="this.school" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '@/services/firebase.js'
import ActivityList from '@/components/ActivityList'
import ProgressGraph from '@/components/ProgressGraph'
export default {
  components: {
    ActivityList,
    ProgressGraph
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
      school: {},
      gold: []
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
      gold: {
        ref: db.collection('rankingInfo'),
        objects: true,
        resolve: data => {
          this.gold = data.gold
        },
        reject: err => {
          console.log('error fetching rank from firestore', err)
        }
      }
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
