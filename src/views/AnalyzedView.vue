<template>
  <div class="w-full flex flex-col px-6 text-left">
    <div class="flex flex-row justify-between space-x-2 w-full items-center">
      <div
        v-if="loading && !scanData"
        class="w-56 animate-pulse h-8 my-2 bg-brand-purple opacity-10 rounded-lg"
      />
      <div
        v-else
        class="truncate flex flex-row space-x-2.5 items-center text-lg h-10"
      >
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
    <div
      v-if="loading && !scanData"
      class="w-40 animate-pulse h-3 mb-2 bg-brand-purple opacity-10 rounded-md"
    />
    <div v-else class="text-xs pb-6">Scanned {{ scanDate }}</div>

    <div
      v-if="loading && !scanData"
      class="w-full grid grid-cols-2 gap-4 animate-pulse h-60"
    >
      <div class="rounded-xl shadow-md bg-brand-purple opacity-10" />
      <div class="rounded-xl shadow-md bg-brand-purple opacity-10" />
    </div>
    <div v-else class="w-full grid grid-cols-2 gap-4">
      <img
        v-if="scan"
        :src="scan"
        alt="captured"
        class="rounded-xl shadow-md"
      />
      <img
        v-if="productPhoto"
        :src="productPhoto"
        @click="addProductPhoto"
        alt="product-photo"
        class="rounded-xl shadow-md"
      />
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
    <div class="my-6 h-px w-full bg-gray-700" />
    <div v-if="loading && !scanData" class="w-full animate-pulse">
      <div class="w-48 h-4 mb-2 bg-brand-purple opacity-10 rounded-md" />
      <div class="w-full h-40 mb-2 bg-brand-purple opacity-10 rounded-lg" />
    </div>
    <div v-else>
      <h2 class="pb-2">Analyzed ingredients overview</h2>
      <p
        v-if="scanData && scanData.ingredientsTypes"
        class="text-sm tracking-wide capitalize space-x-0.5"
      >
        <span
          v-for="(ingredient, index) in scanData.ingredientsTypes"
          :key="index"
          :style="{ color: ingredient.color }"
        >
          {{ ingredient.ingredient }},
        </span>
      </p>
    </div>
    <div v-if="loading && !scanData" class="w-full animate-pulse pt-6">
      <div class="w-48 h-4 mb-2 bg-brand-purple opacity-10 rounded-md" />
      <div class="w-full h-40 mb-2 bg-brand-purple opacity-10 rounded-lg" />
    </div>
    <div v-else class="mt-6">
      <h2 class="pb-2">Grouped by type</h2>
      <div
        class="text-sm grid grid-cols-2 tracking-wide"
        :style="{ color: value[0].color }"
        v-for="[key, value] in groupedAnalysis"
        :key="key"
      >
        <div>
          <span class="capitalize flex-none">{{ key }} </span>
          <span class="flex-none pl-1">({{ value.length }}) </span>
        </div>
        <ul>
          <li
            v-for="(ingredient, index) in value"
            :key="index"
            class="capitalize"
          >
            {{ ingredient.ingredient }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="loading && !scanData" class="w-full animate-pulse mt-6">
      <div class="w-56 h-4 bg-brand-purple opacity-10 rounded-lg" />
    </div>
    <div v-else class="flex flex-row font-medium mt-6 space-x-2">
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
import { useRouter } from "vue-router";

export default {
  setup(props, context) {
    const router = useRouter();
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
    const loading = ref(false);
    const groupedAnalysis = ref();

    onMounted(() => {
      getScanData();
    });

    const getScanData = async () => {
      loading.value = true;
      const docRef = doc(db, `scans-${userUID}`, context.attrs.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        scanData.value = docSnap.data();
        if (!scan.value) {
          scan.value = scanData.value.scanRef;
        }
        productPhoto.value = scanData.value.productPhotoRef;
        productName.value = scanData.value.productName;
        scanDate.value = scanData.value.date;
        if (scanData.value.favourite) {
          favourite.value = scanData.value.favourite;
        }
        groupBy(
          scanData.value.ingredientsTypes,
          (ingredient) => ingredient.type
        );
        loading.value = false;
      } else {
        loading.value = false;
        toast.error("Something went wrong!", {
          position: "bottom-right",
          timeout: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.1,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: false,
          icon: true,
          rtl: false,
        });
      }
    };

    const saveProductName = async () => {
      const docRef = doc(db, `scans-${userUID}`, context.attrs.id);
      await updateDoc(docRef, { productName: productName.value });
      openEditProductName.value = false;
    };

    const addToFavourite = async () => {
      const docRef = doc(db, `scans-${userUID}`, context.attrs.id);
      await updateDoc(docRef, { favourite: true });
      await (favourite.value = true);
      await toast.info("Added to favourites!", {
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

    const removeFromFavourite = async () => {
      const docRef = doc(db, `scans-${userUID}`, context.attrs.id);
      await updateDoc(docRef, { favourite: false });
      await (favourite.value = false);
      await toast.info("Removed from favourites", {
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
      console.log("scanData Id", scanData.value.id);
      router.push({
        name: "camera",
        params: {
          scanId: scanData.value.id,
        },
      });
    };

    function groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      groupedAnalysis.value = map;
      return map;
    }

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
      groupBy,
      groupedAnalysis,
    };
  },
};
</script>
