<template>
  <button
    class="text-white w-max rounded-lg shadow-md px-7 py-2.5"
    :class="[
      type === 'dark'
        ? 'bg-brand-purple hover:bg-brand-pink'
        : 'bg-brand-pink hover:bg-brand-purple',
      text === 'xs' ? 'text-xs' : 'text-base',
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
  },
  setup() {},
};
</script>
