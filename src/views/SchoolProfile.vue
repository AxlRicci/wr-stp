<template>
  <v-content>
    <v-row>
      <v-col>
        <h1>{{ school.name }}</h1>
        <h3>{{ `${school.city}, ${school.board}` }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col><h2>Activities</h2></v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex ma-0" v-for="cat in categories" :key="cat">
        <div>
          <v-card class="mx-auto" max-width="300" tile>
            <v-list dense>
              <v-subheader>
                <v-row class="d-flex justify-start">
                  <v-col>
                    <h2>
                      {{ cat.charAt(0).toUpperCase() + cat.substring(1) }}
                    </h2>
                  </v-col>
                  <v-col>
                    <v-progress-circular
                      :value="percentComplete(school[cat], cat)"
                      color="deep-orange lighten-2"
                    ></v-progress-circular>
                  </v-col>
                </v-row>
              </v-subheader>
              <v-list-item-group>
                <v-list-item v-for="act in school[cat]" :key="act.name">
                  <v-list-item-icon>
                    <v-icon
                      v-text="completeIcon(act)"
                      :color="completeColor(act)"
                    ></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="act.name.split(/(?=[A-Z])/).join(' ')"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
import { db } from '@/services/firebase.js'
export default {
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
      ]
    }
  },
  firestore() {
    return {
      school: db.collection('schoolData').doc(this.slug),
      gold: db.collection('rankingInfo').doc('gold')
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
    },
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
