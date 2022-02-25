<template>
  <div class="h-screen w-screen bg-brand-nude items-center">
    <slider></slider>
    <div>
      <BrandButton text="Create an account"></BrandButton>
      <p class="pt-4">
        Have an account? <span class="font-medium">Login</span>
      </p>
    </div>
  </div>
</template>

<script>
import BrandButton from "../components/BrandButton.vue";
import Slider from "../components/slider.vue";
export default {
  setup() {},
  components: { BrandButton, Slider },
};
</script>
