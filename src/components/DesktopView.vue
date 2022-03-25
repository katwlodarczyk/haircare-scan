<template>
  <div class="bg-brand-nude w-screen h-screen">
    <div
      class="lg:container lg:mx-auto w-screen h-screen flex flex-row p-8 lg:p-24 items-center justify-between"
    >
      <div
        class="flex flex-col w-full md:w-1/2 justify-between items-center space-y-12"
      >
        <div class="space-y-4">
          <img src="../assets/images/logo.svg" alt="logo" />
          <p class="text-2xl">Take the guess work out of hair care</p>
        </div>
        <img src="../assets/images/SLIDER.png" alt="slider" />
        <BrandButton class="text-lg lg:text-2xl py-4"
          >Download on supported mobile device</BrandButton
        >
      </div>
      <img
        src="../assets/images/mockup.png"
        alt="mockup"
        class="hidden md:flex md:h-3/4 lg:h-full"
      />
    </div>
  </div>
</template>

<script>
import BrandButton from "./BrandButton.vue";
export default {
  setup() {},
  components: { BrandButton },
};
</script>
