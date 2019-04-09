<template>
  <v-content>
    <v-tabs v-model="tab" color="#1876D2">
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab v-for="item in items" :key="item" style="color: white">{{ item }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" color="white">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat class="pa-3">
          <Themes v-if="tab == 0"/>
          <Screens v-if="tab == 1"/>
          <Tags v-if="tab == 2"/>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-content>
</template>

<script>
import Themes from "@/components/Themes";
import Screens from "@/components/Screens";
import Tags from "@/components/Tags";

export default {
  components: {
    Themes,
    Screens,
    Tags
  },

  data() {
    return {
      tab: null,
      items: ["Themes", "Screens", "Tags"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

