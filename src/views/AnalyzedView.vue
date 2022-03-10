<template>
  <div class="w-full flex flex-col px-6 text-left">
    <div class="flex flex-row justify-between space-x-2 w-full items-center">
      <div class="truncate flex flex-row space-x-2.5 items-center text-lg h-10">
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
        <span class="truncate" v-else>{{
          productName ? productName : "Add product name"
        }}</span>
        <svg
          @click="openEditProductName = true"
          v-if="openEditProductName === false"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-600 flex-shrink-0"
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
          @click="saveProductName"
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 m-2 text-brand-pink flex-shrink-0"
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
    <div class="text-xs pb-6">Scanned {{ scanDate }}</div>

    <div class="w-full grid grid-cols-2 gap-4">
      <img :src="scan" alt="captured" class="rounded-xl shadow-md" />
      <img v-if="productPhoto" :src="productPhoto" alt="product-photo" />
      <div
        v-else
        @click="addProductPhoto"
        class="bg-brand-pink rounded-xl p-4 flex flex-col justify-center space-y-2 text-sm text-center shadow-md items-center text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>Add photo of the product</span>
      </div>
    </div>
    <div class="pt-6 leading-6">
      <span class="pb-2">This product contains: </span>
      <p class="text-sm">
        2 humectants, 3 emollients, 1 harsh detergent, 2 mild detergents, 3
        preservatives
      </p>
    </div>
    <div class="my-6 h-px w-full bg-gray-700" />
    <div>
      <h2 class="pb-2">Ingredients overview</h2>
      <p class="text-sm">
        Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Sodium
        Chloride, Cocamide MEA, PEG-150 Distearate, Phenoxyethanol, Bis (C13-15
        Alkoxy) Pg-Amodimethicone, Parfum, Methylparaben, Propylparaben, Cocos
        Nucifera (Coconut) Oil, Panthenol, Polyquaternium-10, Prunus Amygdalus
        Dulcis (Sweet Almond) Oil, Tetradibutyl Pentaerithrityl
        Hydroxyhydrocinnamate, Tetrasodium EDTA, Tris
        (Tetramethylhydroxypiperidinol) Citrate, Polyquaternium-7, Citric Acid,
        C14-15 Alcohols, Sodium Benzoate
      </p>
    </div>
    <div class="mt-6">
      <h2 class="pb-2">Grouped by type</h2>
      <p class="text-sm">Humectants- (2) - Glycerin, Panthenol</p>
      <p class="text-sm">
        Emollients - (3) - Bis (C13-15 Alkoxy) Pg-Amodimethicone, Cocos Nucifera
        (Coconut) Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil
      </p>
      <p class="text-sm">Harsh detergents - (1) - Sodium Laureth Sulfate</p>
      <p class="text-sm">
        Mild detergetns - (2) - Cocamidopropyl Betaine, Cocamide MEA, PEG-150
        Distearate
      </p>
      <p class="text-sm">
        Preservatives - (3) - Phenoxyethanol, Methylparaben, Propylparaben,
        Sodium Benzoate
      </p>
    </div>
    <div class="flex flex-row font-medium mt-6 space-x-2">
      <span>Something not right?</span>
      <a
        href="mailto:haircare-scan@gmail.com?subject=Something not right"
        class="underline underline-offset-2"
      >
        Contact Us!
      </a>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { doc, updateDoc, getDoc, getFirestore } from "firebase/firestore";

export default {
  setup(props, context) {
    const db = getFirestore();
    const userUID = localStorage.getItem("userUID");
    const toast = useToast();
    const scanData = ref();
    const productName = ref();
    const scan = ref(context.attrs.scan);
    const productPhoto = ref();
    const openEditProductName = ref(false);
    const scanDate = ref();
    const favourite = ref(false);
    const loading = ref(true);

    onMounted(() => {
      getScanData();
    });

    const getScanData = async () => {
      const docRef = doc(db, `scans-${userUID}`, context.attrs.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        scanData.value = docSnap.data();
        scan.value = scanData.value.scanRef;
        productName.value = scanData.value.productName;
        scanDate.value = scanData.value.date;
        loading.value = false;
      } else {
        console.log("No scan found !");
        // NotificationManager.error(
        //   "Oops, recipe could not been found. Try again.",
        //   "Error!",
        //   2000
        // );
        loading.value = false;
      }
    };

    const saveProductName = async () => {
      const docRef = doc(db, `scans-${userUID}`, context.attrs.id);
      await updateDoc(docRef, { productName: productName.value });
      openEditProductName.value = false;
    };

    const addToFavourite = () => {
      console.log("Added to favourite");
      favourite.value = true;
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

    const removeFromFavourite = () => {
      console.log("removed from fav");
      favourite.value = false;
      toast.info("Removed from favourites", {
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

    const addProductPhoto = () => {
      console.log("add product photo");
    };

    return {
      productName,
      openEditProductName,
      saveProductName,
      addToFavourite,
      removeFromFavourite,
      favourite,
      toast,
      addProductPhoto,
      productPhoto,
      scan,
      getScanData,
      scanData,
      scanDate,
      loading,
    };
  },
};
</script>
