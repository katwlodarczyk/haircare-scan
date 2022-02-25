<template>
  <div
    class="rounded-lg flex flex-col flex-1 justify-center text-center p-4 text-white shadow-lg shadow-brand-purple/10"
    style="background: rgb(202,180,224)"
  >
    <img class="h-24" :src="articleImage" />
    <h2 class="mt-2 text-sm font-normal">How to choose a shampoo</h2>
  </div>
</template>

<script>
export default {
  props: {
    articleImage: {
      type:String,
      required: true,
    },
  },
  setup() {},
};
</script>
