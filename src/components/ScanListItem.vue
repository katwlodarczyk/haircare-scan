<template>
  <div
    class="flex flex-row justify-between items-center odd:bg-brand-pale even:bg-brand-nude space-x-4"
    :class="productPhoto ? 'py-2 pr-6 pl-4' : 'py-5 px-6'"
  >
    <div
      @click="
        $router.push({
          name: 'analyzed',
          params: { id: id },
        })
      "
      class="truncate flex flex-row items-center space-x-5"
      :class="productPhoto ? 'space-x-3' : 'space-x-6'"
    >
      <img
        v-if="productPhoto"
        :src="productPhoto"
        alt="product photo"
        class="h-16"
      />
      <img v-else src="../assets/icons/eye.svg" alt="eye icon" />

      <h2 class="truncate min-w-56 text-left">{{ title }}</h2>
    </div>
    <img
      v-show="withRemove"
      @click="$emit('removeScan')"
      class="flex-shrink-0 w-5 h-5"
      src="../assets/icons/delete.svg"
    />
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  emits: ["removeScan"],
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    withRemove: {
      type: Boolean,
      required: false,
      default: true,
    },
    productPhoto: {
      type: String,
      required: false,
    },
  },
  setup() {
    const router = useRouter();

    return { router };
  },
};
</script>
