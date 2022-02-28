<template>
  <button
    class="text-white w-max rounded-lg shadow-md px-7 py-2.5"
    :class="
      type === 'dark'
        ? 'bg-brand-purple hover:bg-brand-pink text-xs '
        : 'bg-brand-pink hover:bg-brand-purple'
    "
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      String,
      required: false,
    },
  },
  setup() {},
};
</script>
