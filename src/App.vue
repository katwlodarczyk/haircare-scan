<template>
  <div className="font-koho">
    <Banner />

    <RouterView />
  </div>
  <TabBar />
</template>

<script setup>
import { RouterView } from "vue-router";
import TabBar from "./components/TabBar.vue";
import Banner from "./components/Banner.vue";
</script>
