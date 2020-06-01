<template>
  <div>
    <RegionalStpGraph :schools="this.schools" />
    <SchoolsTable :schools="this.schools" />
  </div>
</template>

<script>
import { db } from '@/services/firebase.js'
import SchoolsTable from '@/components/SchoolsTable'
import RegionalStpGraph from '@/components/RegionalStpGraph'
export default {
  name: 'Home',
  components: {
    SchoolsTable,
    RegionalStpGraph
  },
  data() {
    return {
      schools: {}
    }
  },
  firestore() {
    return {
      schools: {
        ref: db.collection('schoolData'),
        objects: true,
        resolve: data => {
          this.schools = data
          console.log(this.schools)
        },
        reject: err => {
          console.log('error fetching school from firestore', err)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.school-list {
  &--wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-right: 20px;
  }
}
</style>
