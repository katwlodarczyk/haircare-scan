<template>
  <div class="bg-brand-pink hover:bg-brand-purple text-white w-max rounded-lg shadow-md px-7 py-2.5">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup() {},
};
</script>
