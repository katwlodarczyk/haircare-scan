<template>
  <div>
    <ViewHeader heading="Analyze text" icon="text" />
    <div class="px-4 flex flex-col space-y-4">
      <p>Paste the ingredients here to analyze them</p>
      <textarea
        v-model="text"
        type="text"
        name="text"
        rows="8"
        class="rounded-lg flex-auto w-full bg-brand-pale px-3 py-2 border border-brand-pink outline-none ring-1 ring-brand-pink focus:shadow-brand-pink"
      />
    </div>
    <BrandButton @click="analyzeText(text)" class="mx-auto w-11/12 mt-3"
      >Analyze</BrandButton
    >
  </div>
</template>

<script>
import { ref } from "vue";
import BrandButton from "../components/BrandButton.vue";
import ViewHeader from "../components/ViewHeader.vue";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  getFirestore,
  setDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { DateTime } from "luxon";
import { useToast } from "vue-toastification";
export default {
  components: {
    ViewHeader,
    BrandButton,
  },
  setup() {
    const toast = useToast();
    const db = getFirestore();
    const userUID = localStorage.getItem("userUID");
    const typesRef = collection(db, "types");
    const text = ref();
    const router = useRouter();
    const loading = ref(false);
    const ingredientsArray = ref();
    const loadingSentences = [
      "Recognizing ingredients...",
      "Analyzing the types...",
      "Saving the scan...",
      "Preparing the view...",
    ];
    let i = ref(0);
    const scanName = ref();

    const analyzeText = async (text) => {
      loading.value = true;
      scanName.value = uuidv4();

      setInterval(() => {
        if (i.value < loadingSentences.length - 1) i.value++;
        else i.value = 0;
      }, 6000);

      // split text into ingredients - done!
      // compare those ingredients with db
      // return doc name
      // calculate how many of which types there is
      // color code the ingredients

      ingredientsArray.value = text.split(",");

      async function compareIngredients(ingredientsArray) {
        const queries = [];
        ingredientsArray.forEach((ingredient) => {
          const q = query(
            typesRef,
            where("ingredients", "array-contains", ingredient)
          );
          console.log("ingredient", ingredient);
          queries.push(q);
        });
        console.log("queries", queries);

        const compare = async () => {
          return Promise.all(
            queries.map((query) => {
              doSomethingAsync(query);
            })
          );
        };

        const doSomethingAsync = async (query) => {
          console.log("dosmthasync");
          const querySnapshot = await getDocs(query);
          console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        };

        compare();
      }

      await compareIngredients(ingredientsArray.value);
      await saveScan(scanName.value, text, ingredientsArray.value);

      loading.value = false;
      await router.push({
        name: "analyzed",
        params: {
          id: scanName.value,
        },
      });
    };

    const saveScan = async (scanName, text, ingredientsArray) => {
      const add = {
        ...{
          date: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
          id: scanName,
          text: text,
          scannedIngredients: ingredientsArray,
        },
      };

      const scanFile = doc(db, `scans-${userUID}`, `${scanName}`);

      try {
        await setDoc(scanFile, add, { merge: true });
      } catch (e) {
        toast.error("Oops, something went wrong. Try again!", {
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
        console.log(e);
      }
    };

    return { router, text, analyzeText };
  },
};
</script>
