<template>
  <div class="h-screen overflow-y-auto font-koho text-gray-700">
    <Banner
      v-show="
        isAuthenticated &&
        ![
          'login',
          'welcome',
          'register',
          'scanner',
          'camera',
          'forgot-password',
        ].includes($route.name)
      "
    />
    <ReloadPWA />

    <RouterView
      v-slot="{ Component }"
      class="flex flex-col"
      :class="[
        isAuthenticated &&
        ![
          'login',
          'welcome',
          'register',
          'scanner',
          'camera',
          'forgot-password',
          'privacy-policy',
        ].includes($route.name)
          ? 'pb-36 pt-24 justify-center'
          : !['welcome'].includes($route.name)
          ? 'py-10 justify-center'
          : 'justify-center',
        ['analyzed', 'privacy-policy'].includes($route.name)
          ? ''
          : 'text-center',
      ]"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </RouterView>
    <TabBar
      v-if="
        isAuthenticated &&
        ![
          'login',
          'welcome',
          'register',
          'scanner',
          'camera',
          'forgot-password',
        ].includes($route.name)
      "
    />
  </div>
</template>

<script setup>
import ReloadPWA from "./components/ReloadPWA.vue";
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
