<template>
  <div class="font-koho text-gray-700">
    <Banner
      v-show="
        isAuthenticated &&
        !['login', 'welcome', 'register'].includes($route.name)
      "
    />

    <RouterView
      v-slot="{ Component }"
      class="flex flex-col text-center"
      :class="
        isAuthenticated &&
        !['login', 'welcome', 'register'].includes($route.name)
          ? 'py-36 justify-center'
          : 'py-10'
      "
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </RouterView>
    <TabBar
      v-if="
        isAuthenticated &&
        !['login', 'welcome', 'register'].includes($route.name)
      "
    />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import TabBar from "./components/TabBar.vue";
import Banner from "./components/Banner.vue";
import useAuth from "./services/useAuth";
import { useRoute } from "vue-router";
const { isAuthenticated } = useAuth();
const route = useRoute;
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
