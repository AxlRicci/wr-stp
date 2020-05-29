<template>
  <div class="school-list--wrapper">
    <v-card max-width="500" class="mx-auto">
      <v-toolbar color="indigo" dark>
        <v-toolbar-title
          >{{ city }} ({{ this.schoolList.length }})</v-toolbar-title
        >
      </v-toolbar>

      <v-list :min-width="this.minWidth">
        <v-list-item v-for="school in this.schoolList" :key="school.slug">
          <v-list-item-icon>
            <v-icon v-if="school.overall == 'EXPLORER'" color="#add8e6"
              >mdi-star</v-icon
            >
            <v-icon v-if="school.overall == 'BRONZE'" color="#804A00"
              >mdi-star</v-icon
            >
            <v-icon v-if="school.overall == 'SILVER'" color="#c0c0c0"
              >mdi-star</v-icon
            >
            <v-icon v-if="school.overall == 'GOLD'" color="#D4AF37"
              >mdi-star</v-icon
            >
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="school.name"></v-list-item-title>
            <v-list-item-subtitle v-text="school.board"></v-list-item-subtitle>
          </v-list-item-content>

          <!-- <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar> -->
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    schools: {
      type: Array,
      required: true
    },
    city: {
      type: String,
      required: 'All'
    },
    minWidth: {
      type: String,
      default: '300px'
    }
  },
  computed: {
    schoolList() {
      if (this.city == 'Townships') {
        return this.schools
          .filter(
            school =>
              school.city !== 'Cambridge' &&
              school.city !== 'Kitchener' &&
              school.city !== 'Waterloo'
          )
          .sort((a, b) => b.lowest - a.lowest)
      } else {
        return this.schools
          .filter(school => school.city == this.city)
          .sort((a, b) => b.lowest - a.lowest)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
