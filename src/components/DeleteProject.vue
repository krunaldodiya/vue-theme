<template>
  <v-layout row justify-center style="margin-top: -3px; margin-left: 30px">
    <v-btn color="error" flat @click.stop="dialog = true">delete</v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete Project</v-card-title>
        <v-card-text>Are you sure want to delete this project ?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" flat="flat" @click="deleteProject" :loading="loading">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
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
