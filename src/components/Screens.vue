<template>
  <v-layout column>
    <v-card class="pa-2">
      <v-flex xs12 md4>
        <v-text-field
          v-model="screen.name"
          :rules="screenRules"
          :counter="10"
          label="screen name"
          required
          class="pa-2"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 md4>
        <v-btn color="success" @click="createScreen" :loading="loading">create</v-btn>
      </v-flex>
    </v-card>

    <div class="mt-5">
      <div v-if="loading">Loading...</div>

      <div v-if="!loading">
        <div
          v-for="screen in screens"
          :key="screen.id"
          style="border: 1px solid #ccc; padding: 10px; margin: 5px"
        >
          <div>{{screen.name}}</div>
          <div>{{screen.default ? "Default": ""}}</div>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
import { db, auth } from "@/js/firebase";

export default {
  props: ["project"],

  data() {
    return {
      loading: false,
      projectId: this.$route.params.id,
      screens: [],
      screen: {
        name: ""
      },
      screenRules: [
        value =>
          value.length >= 3 || "screen name must be minimum 3 characters."
      ],
      loading: false,
      dialog: false
    };
  },

  async created() {
    const projectId = this.projectId;

    const screens = await db.collection(`projects/${projectId}/screens`);

    screens.onSnapshot(snapshot => {
      this.screens = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
    });

    screens
      .get()
      .then(snapshot => {
        this.screens = snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });

        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
      });
  },

  methods: {
    async createScreen() {
      const projectId = this.projectId;
      const { name } = this.screen;

      this.loading = true;

      try {
        const screens = await db
          .collection(`projects/${projectId}/screens`)
          .add({
            name: name
          });

        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>
