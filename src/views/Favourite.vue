<template>
  <EmptyState
    v-if="false"
    withArrow="false"
    topText="You don't have any favourite scans yet."
  />
  <div v-else>
    <ViewHeader heading="Your favourite scans" icon="heart" />
    <ScanListItem
      v-for="fav in favData"
      :key="fav.id"
      :title="fav.productName ? fav.productName : fav.date"
      :id="fav.id"
      :withRemove="false"
    />
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

    onMounted(() => {
      getFavouritesData();
    });

    const getFavouritesData = async () => {
      let favs = [];
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size) {
        querySnapshot.forEach((doc) => {
          favs.push({ ...doc.data(), ...{ id: doc.id } });
        });
        favData.value = favs;
      }
    };
    return { favData };
  },
};
</script>
