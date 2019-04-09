<template>
  <v-container pa-0 ma-2>
    <v-content>
      <v-layout row wrap>
        <div v-if="loading">Loading...</div>

        <CreateProject v-if="!loading" class="mr-2"/>

        <v-flex
          v-for="(project, index) in projects"
          :key="index"
          style="width: 240px; max-width: 240px"
        >
          <v-card>
            <div style="height: 200px; background: #7eb8ea"></div>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-2">{{project.name}}</h3>
                <div class="grey--text">
                  <v-icon small @click="showKey = showKey ? null : project.id">lock</v-icon>
                  <span class="ml-1">{{getProjectID(project)}}</span>
                </div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="blue" :to="browseProjectByID(project)">Browse</v-btn>

              <DeleteProject :project="project"/>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
  </v-container>
</template>

<script>
import { db, auth } from "@/js/firebase";
import CreateProject from "@/components/CreateProject";
import DeleteProject from "@/components/DeleteProject";

export default {
  name: "home",

  components: {
    CreateProject,
    DeleteProject
  },

  computed: {
    authUser() {
      return auth.currentUser;
    }
  },

  data() {
    return {
      showKey: null,
      showModal: false,
      loading: false,
      projects: []
    };
  },

  created() {
    this.loading = true;

    const projects = db
      .collection("projects")
      .where("userID", "==", this.authUser.uid);

    projects.onSnapshot(snapshot => {
      this.projects = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
    });

    projects
      .get()
      .then(snapshot => {
        this.projects = snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });

        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
      });
  },

  methods: {
    browseProjectByID(project) {
      return `/project/${project.id}`;
    },

    getProjectID(project) {
      return this.showKey == project.id ? project.id : "****************";
    }
  }
};
</script>
