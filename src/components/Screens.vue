<template>
  <v-layout row wrap>screens</v-layout>
</template>

<script>
import { db, auth } from "@/js/firebase";

export default {
  props: ["project"],

  data() {
    return {
      loading: false,
      dialog: false
    };
  },

  methods: {
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
