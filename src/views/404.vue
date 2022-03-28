<template>
  <div
    class="w-full flex flex-col flex-none absolute justify-center items-center inset-y-1/4 py-36 flex flex-col justify-center text-center"
  >
    <img class="mb-6 flex flex-none" src="../assets/images/404.svg" />
    <p>Oops! I couldn't find what you're looking for.</p>
    <p>
      Please go back to
      <router-link to="/" class="font-semibold">dashboard</router-link>
    </p>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
  },
};
</script>
