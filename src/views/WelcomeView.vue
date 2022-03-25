<template>
  <div>
    <div
      v-if="isMobile()"
      class="h-screen w-screen flex flex-col space-y-4 bg-brand-nude items-center -my-10"
      :class="downloaded ? '' : 'pb-24'"
    >
      <Banner withSlogan class="mb-4" />
      <SliderComponent></SliderComponent>
      <div v-if="downloaded">
        <router-link to="/register"
          ><BrandButton>Create an account</BrandButton></router-link
        >
        <p class="text-sm pt-4">
          Have an account?
          <router-link to="/login"
            ><span class="font-medium">Login</span></router-link
          >
        </p>
      </div>
      <PWAprompt :installed="downloaded" />
    </div>
    <DesktopView v-else />
  </div>
</template>

<script>
import DesktopView from "../components/DesktopView.vue";
import BrandButton from "../components/BrandButton.vue";
import SliderComponent from "../components/SliderComponent.vue";
import Banner from "../components/Banner.vue";
import PWAprompt from "../components/PWAprompt.vue";
import { ref, onBeforeMount } from "vue";

export default {
  components: { DesktopView, BrandButton, SliderComponent, Banner, PWAprompt },
  setup() {
    const downloaded = ref(false);

    function isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    }

    onBeforeMount(() => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        downloaded.value = true;
      } else if (navigator.standalone) {
        downloaded.value = true;
      } else {
        downloaded.value = false;
      }
    });

    return { isMobile, downloaded };
  },
};
</script>
