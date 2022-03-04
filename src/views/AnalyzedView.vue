<template>
  <div class="w-full flex flex-col px-6">
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-row space-x-2.5 items-center text-lg">
        <div
          @click="openEditProductName = true"
          v-if="openEditProductName === true"
        >
          <input
            v-model="productName"
            type="text"
            name="name"
            :placeholder="productName ? productName : 'Add product name'"
            class="rounded-lg bg-brand-pale px-2 border border-brand-pink outline-none ring-1 ring-brand-pink focus:shadow-brand-pink"
          />
        </div>
        <span v-else class="py-3">{{
          productName ? productName : "Add product name"
        }}</span>
        <svg
          @click="openEditProductName = true"
          v-if="openEditProductName === false"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <svg
          @click="openEditProductName = false"
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 m-2 text-brand-pink"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <img
        @click="addToFavourite"
        v-if="!favourite"
        class="w-6 h-6"
        src="../assets/icons/favourite-inactive.svg"
        alt="favourite-icon"
      />
      <img
        v-else
        @click="removeFromFavourite"
        class="w-6 h-6"
        src="../assets/icons/favourite-active.svg"
        alt="favourite-icon"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    const productName = ref();
    const openEditProductName = ref(false);
    const favourite = ref(false);

    const saveProductName = () => {
      console.log("it works");
      openEditProductName.value = false;
    };

    const addToFavourite = () => {
      console.log("Added to favourite");
      favourite.value = true;
      toast.info("Added to favourites!", {
        position: "bottom-right",
        timeout: "1000",
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

    const removeFromFavourite = () => {
      console.log("removed from fav");
      favourite.value = false;
      toast.info("Removed from favourites", {
        position: "bottom-right",
        timeout: "1000",
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

    return {
      productName,
      openEditProductName,
      saveProductName,
      addToFavourite,
      removeFromFavourite,
      favourite,
      toast,
    };
  },
};
</script>
