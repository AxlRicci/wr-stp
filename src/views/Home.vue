<template>
  <div class="school-list--wrapper">
    <div class="school-list--kitchener">
      <SchoolList :schools="schools" city="Kitchener" />
    </div>
    <div class="school-list--cambridge">
      <SchoolList :schools="schools" city="Cambridge" />
    </div>
    <div class="school-list--waterloo">
      <SchoolList :schools="schools" city="Waterloo" />
    </div>
    <div class="school-list--townships">
      <SchoolList :schools="schools" city="Townships" />
    </div>
  </div>
</template>

<script>
import { db } from '@/services/firebase.js'
import SchoolList from '@/components/SchoolList'
export default {
  name: 'Home',
  components: {
    SchoolList
  },
  data() {
    return {
      componentKey: 0
    }
  },
  firestore() {
    return {
      schools: db.collection('schoolData')
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
