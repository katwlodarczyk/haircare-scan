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
        @remove-scan="removeScan(scan.id)"
      />
    </div>
  </div>
</template>

<script>
import EmptyState from "../components/EmptyState.vue";
import ViewHeader from "../components/ViewHeader.vue";
import ScanListItem from "../components/ScanListItem.vue";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { onMounted, ref } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";

export default {
  components: { EmptyState, ViewHeader, ScanListItem },
  setup() {
    const db = getFirestore();
    const userUID = localStorage.getItem("userUID");
    const scansRef = collection(db, `scans-${userUID}`);
    const scansData = ref();
    const toast = useToast();
    const storage = getStorage();
    const loading = ref(false);

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

    const removeScan = async (id) => {
      loading.value = true;
      const scanRef = storageRef(storage, `users-scans/${userUID}/${id}.png`);
      // Delete the file
      await deleteObject(scanRef)
        .then(async () => {
          await deleteDoc(doc(db, `scans-${userUID}`, id));
          await (loading.value = false);
          await toast.info("Removed scan", {
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
        })
        .catch((error) => {
          loading.value = false;
          console.log("error", error);
        });
    };

    return { scansData, removeScan };
  },
};
</script>
