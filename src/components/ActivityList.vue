<template>
  <v-data-table
    :headers="headers"
    :items="activities"
    :items-per-page="100"
    item-key="name"
    group-by="category"
    class="elevation-1"
    show-group-by
    ><template v-slot:item.complete="{ item }">
      <v-chip class="ma-2" :color="getColor(item.complete)" text-color="#000">
        <v-avatar>
          <v-icon>{{ getIcon(item.complete) }}</v-icon>
        </v-avatar>
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    school: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Activity',
          align: 'start',
          value: 'name'
        },
        { text: 'Complete', value: 'complete' },
        { text: 'Points', value: 'points' },
        { text: 'Category', value: 'category' }
      ],
      categories: [
        'consultation',
        'education',
        'encouragement',
        'enforcement',
        'evaluation',
        'engineering'
      ],
      activities: []
    }
  },
  watch: {
    school: function() {
      this.populateActivities()
    }
  },
  computed: {},
  methods: {
    populateActivities() {
      this.categories.forEach(category => {
        console.log(this.school, category)
        if (Object.prototype.hasOwnProperty.call(this.school, category)) {
          Object.keys(this.school[category]).forEach(activity => {
            console.log(this.school[category][activity])
            this.activities.push({
              category: `${category.charAt(0).toUpperCase() +
                category.slice(1)}`,
              name: this.school[category][activity].name
                .split(/(?=[A-Z])/)
                .join(' '),
              points: this.school[category][activity].points,
              complete: this.school[category][activity].complete
            })
          })
        }
      })
    },
    getColor(complete) {
      if (complete == true) {
        return 'green'
      } else {
        return 'red'
      }
    },
    getIcon(complete) {
      if (complete == true) {
        return 'mdi-checkbox-marked-circle'
      } else {
        return 'mdi-close'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
