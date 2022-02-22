<template>
  <nav
    class="z-30 fixed bottom-0 w-full bg-brand-teal text-white shadow-xl flex flex-row items-center justify-between px-7 pt-4 pb-8 text-xs"
  >
    <RouterLink to="/" class="flex flex-col justify-center items-center space-y-2.5">Home</RouterLink>
    <RouterLink to="/about" class="flex flex-col justify-center items-center space-y-2.5">About</RouterLink>
  </nav>
</template>

<script>
export default {
  name: "TabBar",
  setup() {},
};
</script>
