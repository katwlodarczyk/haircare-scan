<template>
  <EmptyState
    v-if="false"
    topText="You haven't scanned anything yet."
    bottomText="Use the scanner."
  />
  <div v-else>
    <ViewHeader heading="Your previous scans" icon="time" />
    <div>
      <ScanListItem
        v-for="scan in scansData"
        :key="scan.id"
        :title="scan.productName ? scan.productName : scan.date"
        :id="scan.id"
        :withMenu="true"
      />
    </div>
  </div>
</template>

<script>
import EmptyState from "../components/EmptyState.vue";
import ViewHeader from "../components/ViewHeader.vue";
import ScanListItem from "../components/ScanListItem.vue";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { onMounted, ref } from "@vue/runtime-core";

export default {
  components: { EmptyState, ViewHeader, ScanListItem },
  setup() {
    const db = getFirestore();
    const userUID = localStorage.getItem("userUID");
    const scansRef = collection(db, `scans-${userUID}`);
    const scansData = ref();

    onMounted(() => {
      getScansData();
    });

    const getScansData = async () => {
      let scans = [];
      const docSnap = await getDocs(scansRef);
      if (docSnap.size) {
        docSnap.forEach((doc) => {
          scans.push({ ...doc.data(), ...{ id: doc.id } });
        });
        scansData.value = scans;
      }
    };
    return { scansData };
  },
};
</script>
