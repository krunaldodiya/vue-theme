<template>
  <nav>
    <v-toolbar app dark color="#1976d2" class="elevation-0">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-title class="headline">
        <span>Awesome</span>
        <span class="font-weight-light">Theme</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn flat>
        <span class="mr-1">{{displayName}}</span>
      </v-btn>

      <v-btn flat @click="logout">
        <span class="mr-1">Logout</span>
        <v-icon right>logout</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="drawerBackground">
      <v-layout column align-center>
        <v-flex class="mt-5 mb-3">
          <v-avatar size="120">
            <img src="https://cdn2.iconfinder.com/data/icons/avatars-2-7/128/1-512.png" alt>
          </v-avatar>

          <h1 class="white--text mt-4">{{ displayName.toUpperCase() }}</h1>
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-tile
          v-for="(link, index) in links"
          :key="index"
          router
          :to="link.route"
          :style="{'background': link.route == activeRoute ? '#8740f5': ''}"
        >
          <v-list-tile-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{link.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { auth } from "@/js/firebase";

export default {
  data() {
    return {
      activeRoute: "/",
      drawer: false,
      links: [
        { name: "Projects", icon: "folder", route: "/" },
        { name: "Teams", icon: "person", route: "/teams" }
      ]
    };
  },

  watch: {
    $route(to, from) {
      this.activeRoute = to.path;
    }
  },

  computed: {
    displayName() {
      return auth.currentUser.displayName;
    }
  },

  methods: {
    async logout() {
      await auth.signOut();
      await localStorage.removeItem("authUserUID");

      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>
