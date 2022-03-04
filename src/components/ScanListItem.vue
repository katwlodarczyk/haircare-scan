<template>
  <div
    class="flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-5 space-x-4"
  >
    <div
      @click="
        $router.push({
          name: 'analyzed',
          params: { id: 1, scan: capturedImage },
        })
      "
      class="flex flex-row space-x-4"
    >
      <img v-if="withPhoto" src="" alt="" />
      <img v-else src="../assets/icons/eye.svg" alt="eye icon" />

      <h2 class="truncate">{{ title }}</h2>
    </div>
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
      <div
        v-if="displayMenu"
        class="z-40 origin-top-right absolute mt-1 right-0 w-40 rounded-md shadow-md bg-brand-pale focus:outline-none"
      >
        <div class="py-1 w-full float-right">
          <div
            @click="addToFavourite"
            class="text-gray-700 w-full justify-end flex flex-row space-x-2 items-center px-4 py-3 text-xs"
            id="0"
          >
            <span>Add to favourites</span>
            <img class="w-5 h-5" src="../assets/icons/favourite-inactive.svg" />
          </div>
          <div
            @click="removeScan"
            class="text-gray-700 w-full justify-end flex flex-row space-x-2 items-center px-4 py-3 text-xs"
            id="1"
          >
            <span>Remove a scan</span>
            <img class="w-5 h-5" src="../assets/icons/delete.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    withPhoto: {
      type: Boolean,
      required: false,
    },
  },
  setup() {
    const router = useRouter();
    let displayMenu = ref(false);
    const toast = useToast();

    const addToFavourite = () => {
      console.log("Added to favourite");
      toast.info("Added to favourites!", {
        position: "bottom-right",
        timeout: 1000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.1,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: false,
        icon: false,
        rtl: false,
      });
    };

    return { router, displayMenu, addToFavourite, toast };
  },
};
</script>
