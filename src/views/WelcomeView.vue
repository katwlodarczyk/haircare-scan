<template>
  <div
    class="h-screen w-screen flex flex-col space-y-4 bg-brand-nude items-center"
  >
    <Banner withSlogan="true" class="mb-4" />
    <SliderComponent></SliderComponent>
    <div>
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
  </div>
</template>

<script>
import BrandButton from "../components/BrandButton.vue";
import SliderComponent from "../components/SliderComponent.vue";
import Banner from "../components/Banner.vue";
export default {
  setup() {},
  components: { BrandButton, SliderComponent, Banner },
};
</script>
