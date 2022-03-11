<template>
  <div class="bg-brand-nude h-screen flex flex-col">
    <Banner withSlogan class="" />
    <div class="px-10 pt-36">
      <h1 class="text-2xl font-medium pb-4">Reset link sent</h1>
      <p class="px-4 text-sm pb-6">Please check your email address.</p>
    </div>
    <BrandButton class="w-2/3 mx-auto mb-6 mt-8">
      <router-link to="/login" replace
        >Go back to login</router-link
      ></BrandButton
    >
    <p class="text-sm">
      or
      <router-link to="/register" replace class="font-medium"
        >Create an account</router-link
      >
    </p>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import BrandButton from "../components/BrandButton.vue";
import { useRouter } from "vue-router";
export default {
  components: {
    Banner,
    BrandButton,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
};
</script>
