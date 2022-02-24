<template>
  <div className="font-koho text-gray-700">
    <Banner />

    <RouterView class="py-36 flex flex-col justify-center text-center" />
  </div>
  <TabBar />
</template>

<script setup>
import { RouterView } from "vue-router";
import TabBar from "./components/TabBar.vue";
import Banner from "./components/Banner.vue";
</script>
