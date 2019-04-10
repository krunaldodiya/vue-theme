<template>
  <v-layout column>
    <v-card class="pa-2">
      <v-flex xs12 md4>
        <v-text-field
          v-model="theme.name"
          :rules="themeRules"
          :counter="10"
          label="Theme name"
          required
          class="pa-2"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 md4>
        <v-btn color="success" @click="createTheme" :loading="loading">create</v-btn>
      </v-flex>
    </v-card>

    <div class="mt-5">
      <div v-if="loading">Loading...</div>

      <div v-if="!loading">
        <div
          v-for="theme in themes"
          :key="theme.id"
          style="border: 1px solid #ccc; padding: 10px; margin: 5px"
        >
          <div>
            <span style="margin-right: 5px">{{theme.name}}</span>
            <span v-if="theme.default">(default)</span>
          </div>
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
      themes: [],
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

  async created() {
    const projectId = this.projectId;

    const themes = await db.collection(`projects/${projectId}/themes`);

    themes.onSnapshot(snapshot => {
      this.themes = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
    });

    themes
      .get()
      .then(snapshot => {
        this.themes = snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });

        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
      });
  },

  methods: {
    async createTheme() {
      const projectId = this.projectId;
      const { name } = this.theme;

      this.loading = true;

      try {
        const themes = await db.collection(`projects/${projectId}/themes`).add({
          default: false,
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
