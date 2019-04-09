<template>
  <v-app v-if="loaded">
    <GuestHeader v-if="!authUser"/>
    <AuthHeader v-if="authUser"/>

    <router-view></router-view>
  </v-app>
</template>

<script>
import { auth } from "@/js/firebase";
import GuestHeader from "@/components/GuestHeader";
import AuthHeader from "@/components/AuthHeader";

export default {
  name: "App",

  components: {
    GuestHeader,
    AuthHeader
  },

  data() {
    return {
      loaded: false,
      authUser: null
    };
  },

  created() {
    auth.onAuthStateChanged(authUser => {
      this.loaded = true;
      this.authUser = authUser;
    });
  }
};
</script>

<style>
</style>
