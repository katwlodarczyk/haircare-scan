<template>
  <div className="font-koho">
    <TabBar />

    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import TabBar from "./components/TabBar.vue";
</script>
