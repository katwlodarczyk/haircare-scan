<template>
  <div
    class="flex flex-row odd:bg-brand-pale even:bg-brand-nude px-6 py-5 space-x-4"
  >
    <img v-if="withPhoto" src="" alt="" />
    <img v-else src="../assets/icons/eye.svg" alt="eye icon" />

    <h2 class="truncate">{{ title }}</h2>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-7 w-7 text-brand-purple"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {},
};
</script>
