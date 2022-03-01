<template>
  <div
    class="bg-brand-nude bg-cover px-10 pb-6 pt-12 w-full rounded-b-2xl flex flex-col items-center space-y-3 justify-center"
    :class="withSlogan ? '' : 'fixed top-0'"
  >
    <img src="../assets/images/logo.svg" alt="logo" />
    <p v-if="withSlogan">Take the guess work out of hair care</p>
  </div>
</template>

<script>
export default {
  props: {
    withSlogan: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {},
};
</script>
