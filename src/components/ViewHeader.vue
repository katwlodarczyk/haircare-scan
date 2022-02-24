<template>
  <div class="flex flex-col items-center flex-none space-y-2 mb-10">
    <img class="w-1/4" :src="'/src/assets/icons/' + icon + '.svg'" />
    <h1 class="font-medium text-3xl">{{ heading }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  setup() {},
};
</script>
