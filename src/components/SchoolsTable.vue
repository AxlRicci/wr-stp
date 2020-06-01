<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="schoolArray"
      item-key="name"
      group-by="city"
      class="elevation-1"
      :items-per-page="100"
      show-group-by
      @click:row="goToSchoolProfile"
    >
      <template v-slot:item.overall="{ item }">
        <v-chip :color="getColor(item.overall)" text-color="#000" dark>{{
          item.overall
        }}</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    schools: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name'
        },
        { text: 'City', value: 'city' },
        { text: 'School Board', value: 'board' },
        { text: 'Rank', value: 'overall' }
      ],
      schoolArray: []
    }
  },
  watch: {
    schools: function() {
      this.populateSchoolArray()
    }
  },
  methods: {
    log(data) {
      console.log(data)
    },
    goToSchoolProfile(data) {
      console.log(data)
      this.$router.push({
        name: 'SchoolProfile',
        params: { slug: data.slug, school: data }
      })
    },
    populateSchoolArray() {
      console.log(this.schools)
      Object.keys(this.schools).forEach(school => {
        this.schoolArray.push(this.schools[school])
      })
    },
    getColor(rank) {
      if (rank == 'EXPLORER') {
        return 'blue lighten-3'
      } else if (rank == 'BRONZE') {
        return 'brown lighten-1'
      } else if (rank == 'SILVER') {
        return 'grey lighten-1'
      } else if (rank == 'GOLD') {
        return 'amber lighten-1'
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
