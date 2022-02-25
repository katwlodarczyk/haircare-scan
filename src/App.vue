<template>
  <div className="font-koho text-gray-700">
    <Banner />

    <RouterView
      v-slot="{ Component }"
      class="py-36 flex flex-col justify-center text-center"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </RouterView>
  </div>
  <TabBar />
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
