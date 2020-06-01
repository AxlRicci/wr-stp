<template>
  <v-app-bar app color="green" dark>
    <v-toolbar-title>STSWR School Travel Planning</v-toolbar-title>

    <v-spacer></v-spacer>

    <router-link to="/">
      <v-btn text rounded outlined raised>
        School List
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
