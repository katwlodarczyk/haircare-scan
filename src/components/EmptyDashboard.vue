<template>
  <div
    class="w-full flex flex-col flex-none absolute justify-center items-center inset-y-1/4"
  >
    <img class="mb-6 flex flex-none" src="../assets/images/lady-back.svg" />
    <p>You haven't scanned anything yet.</p>
    <p class="mb-4">Use the scanner.</p>
    <svg
      id="arrow"
      xmlns="http://www.w3.org/2000/svg"
      class="h-10 w-10"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
        d="M16 17l-4 4m0 0l-4-4m4 4V3"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "EmptyHome",
  setup() {
    return {};
  },
};
</script>

<style scoped>
#arrow {
  -webkit-animation: arrow-animate 0.75s infinite alternate-reverse;
  animation: arrow-animate 0.75s infinite alternate-reverse;
}

@keyframes arrow-animate {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(15px);
  }
}
</style>
