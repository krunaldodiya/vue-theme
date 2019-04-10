<template>
  <v-flex style="width: 240px; max-width: 240px">
    <v-card>
      <div style="height: 200px; background: #FBBCB9"></div>

      <v-form ref="login">
        <v-card-title>
          <v-text-field
            id="name"
            name="name"
            label="New Project"
            v-model="project.name"
            type="text"
            height="33"
            style="font-size: 14px"
            placeholder="Enter Project Name"
            :rules="projectRules"
            @keyup="validate"
          ></v-text-field>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="red" @click="create" :loading="loading" :disabled="!formValid">Create</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>
import { db, auth } from "@/js/firebase";

export default {
  data() {
    return {
      loading: false,
      projectRules: [
        value => value.length >= 3 || "Min length must be 3 characters"
      ],
      project: {
        name: ""
      },
      formValid: false
    };
  },

  methods: {
    validate() {
      this.formValid = this.$refs.login.validate();
    },

    async create() {
      const { name } = this.project;

      if (!this.formValid) return;
      this.$refs.login.reset();

      this.loading = true;
      this.project.name = "";

      try {
        const projectsRef = db.collection("projects");
        const projectData = await projectsRef.add({
          name,
          userID: auth.currentUser.uid
        });

        const screensRef = db.collection(`projects/${projectData.id}/screens`);
        const screenData = screensRef.add({ name: "homepage" });

        const themesRef = db.collection(`projects/${projectData.id}/themes`);
        const themeData = themesRef.add({
          name: "My Theme",
          default: true
        });

        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>

