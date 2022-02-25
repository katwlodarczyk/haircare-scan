<template>
  <div class="font-koho text-gray-700">
    <Banner />

    <RouterView
      v-slot="{ Component }"
      class="flex flex-col justify-center text-center"
      :class="!isAuthenticated ? 'py-36' : ''"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </RouterView>
    <TabBar v-if="!isAuthenticated"/>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import TabBar from "./components/TabBar.vue";
import Banner from "./components/Banner.vue";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;

}
</style>
