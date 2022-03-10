<template>
  <div
    class="flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-5 space-x-4"
  >
    <div
      @click="
        $router.push({
          name: 'analyzed',
          params: { id: id },
        })
      "
      class="truncate flex flex-row space-x-4"
    >
      <img v-if="withPhoto" src="" alt="" />
      <img v-else src="../assets/icons/eye.svg" alt="eye icon" />

      <h2 class="truncate min-w-56 text-left">{{ title }}</h2>
    </div>
    <img
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
    withPhoto: {
      type: Boolean,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter();

    return { router };
  },
};
</script>
