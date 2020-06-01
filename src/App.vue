<template>
  <v-app>
    <Navbar />
    <v-content>
      <router-view>
        <Home />
      </router-view>
    </v-content>
  </v-app>
</template>

<script>
import Home from '@/views/Home'
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Home,
    Navbar
  },
  data: () => ({
    //
  })
}
</script>
