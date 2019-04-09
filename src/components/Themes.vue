<template>
  <v-layout row wrap>
    <v-flex xs12 md4>
      <v-text-field
        v-model="theme.name"
        :rules="themeRules"
        :counter="10"
        label="Theme name"
        required
      ></v-text-field>
    </v-flex>

    <v-flex xs12 md4>
      <v-btn color="success" @click="createTheme">create</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { db, auth } from "@/js/firebase";

export default {
  props: ["project"],

  data() {
    return {
      theme: {
        name: ""
      },
      themeRules: [
        value => value.length >= 3 || "Theme name must be minimum 3 characters."
      ],
      loading: false,
      dialog: false
    };
  },

  methods: {
    createTheme() {},

    async deleteProject() {
      this.loading = true;

      try {
        await db
          .collection("projects")
          .doc(this.project.id)
          .delete();

        this.loading = false;
        this.dialog = false;
      } catch (error) {
        this.loading = false;
        this.dialog = false;
      }
    }
  }
};
</script>
