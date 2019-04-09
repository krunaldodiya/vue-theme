<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-spacer mt10></v-spacer>
      <v-card class="elevation-3">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-form @submit="login">
            <v-text-field
              id="email"
              v-model="credentials.email"
              prepend-icon="email"
              name="email"
              label="Email"
              type="email"
            ></v-text-field>

            <v-text-field
              id="password"
              v-model="credentials.password"
              prepend-icon="lock"
              name="password"
              label="Password"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login" :loading="loading">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db, auth } from "@/js/firebase";

export default {
  name: "app",

  data() {
    return {
      loading: false,
      credentials: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    login() {
      this.loading = true;

      const { email, password } = this.credentials;

      auth
        .signInWithEmailAndPassword(email, password)
        .then(data => {
          localStorage.setItem("authUserUID", data.user.uid);
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  },

  created() {
    //
  }
};
</script>
