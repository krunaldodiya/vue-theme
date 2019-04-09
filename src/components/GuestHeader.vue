<template>
  <nav>
    <v-toolbar app dark color="#1976d2">
      <v-toolbar-title class="text-uppercase white--text">
        <span>Awesome</span>
        <span class="font-weight-light">Theme</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn flat to="/login">
        <span class="mr-1">Login</span>
      </v-btn>

      <v-btn flat to="/register">
        <span class="mr-1">Register</span>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>
