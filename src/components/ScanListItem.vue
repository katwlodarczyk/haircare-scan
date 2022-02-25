<template>
  <div
    class="flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-5 space-x-4"
  >
    <img v-if="withPhoto" src="" alt="" />
    <img v-else src="../assets/icons/eye.svg" alt="eye icon" />

    <h2 class="truncate">{{ title }}</h2>

    <div class="relative">
      <svg
        @click="displayMenu = !displayMenu"
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
      <div v-if="displayMenu"
        class="z-40 origin-top-right absolute mt-1 right-0 w-40 rounded-md shadow-md bg-brand-pale focus:outline-none"
      >
        <div class="py-1 w-full float-right">
          <div
            onClick="{addIngredientsToShoppingList}"
            class="text-gray-700 w-full justify-end flex flex-row space-x-2 items-center px-4 py-3 text-xs"
            id="0"
          >
            <span>Add to favourites</span>
            <img class="w-5 h-5" src="../assets/icons/favourite-inactive.svg" >
          </div>
          <div
            onClick="{addIngredientsToShoppingList}"
            class="text-gray-700 w-full justify-end flex flex-row space-x-2 items-center px-4 py-3 text-xs"
            id="0"
          >
            <span>Remove a scan</span>
            <img class="w-5 h-5" src="../assets/icons/delete.svg" >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    let displayMenu = ref(false);
    return { displayMenu };
  },
};
</script>
