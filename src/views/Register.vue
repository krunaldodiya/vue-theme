<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-spacer mt10></v-spacer>
      <v-card class="elevation-3">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-form>
            <v-text-field
              id="name"
              v-model="credentials.name"
              prepend-icon="person"
              name="name"
              label="Name"
              type="text"
            ></v-text-field>

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
          <v-btn color="primary" @click="register" :loading="loading">Register</v-btn>
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
        name: "",
        email: "",
        password: ""
      }
    };
  },

  methods: {
    async register() {
      this.loading = true;

      const { name, email, password } = this.credentials;

      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        await user.updateProfile({ displayName: name });
        localStorage.setItem("authUserUID", user.uid);

        this.$router.push("/");
      } catch (error) {
        this.loading = false;
      }
    }
  },

  created() {
    //
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
