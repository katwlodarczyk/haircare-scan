<template>
  <div v-if="loading && !scansData" class="w-full h-full flex flex-col">
    <ViewHeader heading="Your previous scans" icon="time" />
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
  <EmptyState
    v-else-if="!loading && !scansData"
    topText="You haven't scanned anything yet."
    bottomText="Use the scanner."
    :withArrow="true"
  />
  <div v-else-if="!loading && scansData">
    <ViewHeader heading="Your previous scans" icon="time" />
    <ScanListItem
      v-for="(scan, index) in scansData"
      :key="index"
      :title="scan.productName ? scan.productName : scan.date"
      :id="scan.id"
      :productPhoto="scan.productPhotoRef ? scan.productPhotoRef : ''"
      @remove-scan="confirmRemove(scan.id, index)"
    />
  </div>
</template>

<script>
import EmptyState from "../components/EmptyState.vue";
import ViewHeader from "../components/ViewHeader.vue";
import ScanListItem from "../components/ScanListItem.vue";
import ConfirmToast from "../components/ConfirmToast.vue";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
  query,
  orderBy,
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
      loading.value = true;
      let scans = [];
      const q = query(scansRef, orderBy("date", "desc"));
      const docSnap = await getDocs(q);
      if (docSnap.size) {
        docSnap.forEach((doc) => {
          scans.push({ ...doc.data(), ...{ id: doc.id } });
        });
        scansData.value = scans;
      }
      loading.value = false;
    };

    const confirmRemove = async (id, index) => {
      toast.error(
        {
          component: ConfirmToast,
          listeners: {
            delete: async () => await removeScan(id, index),
          },
        },
        {
          position: "bottom-center",
          timeout: false,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          draggable: true,
          draggablePercent: 0.6,
          hideProgressBar: true,
          closeButton: false,
          icon: true,
          rtl: false,
        }
      );
    };

    const removeScan = async (id, index) => {
      loading.value = true;
      const scanRef = storageRef(storage, `users-scans/${userUID}/${id}.png`);
      const productPhotoRef = storageRef(
        storage,
        `product-photos/${userUID}/${id}.png`
      );
      // Delete the file
      if (
        scansData.value[index].scanRef &&
        !scansData.value[index].productPhotoRef
      ) {
        await deleteObject(scanRef);
        await deleteDoc(doc(db, `scans-${userUID}`, id))
          .then(async () => {
            await toast.info("Scan has been removed.", {
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
            await getScansData();
            await (loading.value = false);
          })
          .catch((error) => {
            loading.value = false;
            console.log("error", error);
          });
      } else if (
        scansData.value[index].productPhotoRef &&
        !scansData.value[index].scanRef
      ) {
        await deleteObject(productPhotoRef);
        await deleteDoc(doc(db, `scans-${userUID}`, id))
          .then(async () => {
            await toast.info("Scan has been removed.", {
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
            await getScansData();
            await (loading.value = false);
          })
          .catch((error) => {
            loading.value = false;
            console.log("error", error);
            toast.error("Something went wrong. Try again.", {
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
          });
      } else if (
        scansData.value[index].scanRef &&
        scansData.value[index].productPhotoRef
      ) {
        await deleteObject(scanRef);
        await deleteObject(productPhotoRef);
        await deleteDoc(doc(db, `scans-${userUID}`, id))
          .then(async () => {
            await toast.info("Scan has been removed.", {
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
            await getScansData();
            await (loading.value = false);
          })
          .catch((error) => {
            loading.value = false;
            console.log("error", error);
            toast.error("Something went wrong. Try again.", {
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
          });
      } else {
        await deleteDoc(doc(db, `scans-${userUID}`, id))
          .then(
            await toast.info("Scan has been removed.", {
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
            }),
            await getScansData(),
            await (loading.value = false)
          )
          .catch((error) => {
            loading.value = false;
            console.log("error", error);
            toast.error("Something went wrong. Try again.", {
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
          });
      }
    };

    return { scansData, removeScan, loading, confirmRemove };
  },
};
</script>
