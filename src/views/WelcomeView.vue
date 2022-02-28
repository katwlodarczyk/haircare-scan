<template>
  <div class="h-screen w-screen bg-brand-nude items-center">
    <SliderComponent></SliderComponent>
    <div>
      <router-link to="/register"
        ><BrandButton>Create an account</BrandButton></router-link
      >
      <p class="pt-4">
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
export default {
  setup() {},
  components: { BrandButton, SliderComponent },
};
</script>
