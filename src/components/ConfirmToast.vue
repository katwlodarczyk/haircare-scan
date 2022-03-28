<template>
  <div class="w-full container flex flex-col text-center text-sm">
    <span>Are you sure you want to do this?</span>
    <div class="mt-2 flex flex-row justify-center space-x-4">
      <button
        class="action w-max px-3 border rounded-md py-1"
        @click.stop="clicked"
      >
        Yes, delete this scan.
      </button>
      <button
        class="action border w-max px-3 rounded-md py-1"
        @click="$emit('close-toast')"
      >
        No.
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clicked() {
      this.$emit("delete");
      this.$emit("close-toast");
    },
  },
};
</script>
