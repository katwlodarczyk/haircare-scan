<template>
  <EmptyState
    v-if="!loading && !favData"
    :withArrow="false"
    topText="You don't have any favourite scans yet."
  />
  <div v-else-if="!loading && favData">
    <ViewHeader heading="Your favourite scans" icon="heart" />
    <ScanListItem
      v-for="fav in favData"
      :key="fav.id"
      :title="fav.productName ? fav.productName : fav.date"
      :id="fav.id"
      :withRemove="false"
      :productPhoto="fav.productPhotoRef ? fav.productPhotoRef : ''"
    />
  </div>
  <div v-else-if="loading && !favData" class="w-full h-full flex flex-col">
    <ViewHeader heading="Your favourite scans" icon="heart" />
    <div
      class="animate-pulse flex odd:bg-brand-pale even:bg-brand-nude w-full h-17 opacity-70"
    ></div>
    <div
      class="animate-pulse flex odd:bg-brand-pale even:bg-brand-nude w-full h-17 opacity-70"
    ></div>
    <div
      class="animate-pulse flex odd:bg-brand-pale even:bg-brand-nude w-full h-17 opacity-70"
    ></div>
    <div
      class="animate-pulse flex odd:bg-brand-pale even:bg-brand-nude w-full h-17 opacity-70"
    ></div>
    <div
      class="animate-pulse flex odd:bg-brand-pale even:bg-brand-nude w-full h-17 opacity-70"
    ></div>
  </div>
</template>

<script>
import EmptyState from "../components/EmptyState.vue";
import ViewHeader from "../components/ViewHeader.vue";
import ScanListItem from "../components/ScanListItem.vue";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { onMounted, ref } from "@vue/runtime-core";

export default {
  components: {
    EmptyState,
    ViewHeader,
    ScanListItem,
  },
  setup() {
    const db = getFirestore();
    const userUID = localStorage.getItem("userUID");
    const scansRef = collection(db, `scans-${userUID}`);
    const q = query(scansRef, where("favourite", "==", true));
    const favData = ref();
    const loading = ref(false);

    onMounted(() => {
      getFavouritesData();
    });

    const getFavouritesData = async () => {
      loading.value = true;
      let favs = [];
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size) {
        querySnapshot.forEach((doc) => {
          favs.push({ ...doc.data(), ...{ id: doc.id } });
        });
        favData.value = favs;
      }
      loading.value = false;
    };
    return { favData, loading };
  },
};
</script>
