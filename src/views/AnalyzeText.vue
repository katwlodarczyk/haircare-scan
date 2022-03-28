<template>
  <div class="py-0">
    <div
      v-show="loading === true"
      class="w-screen h-screen absolute z-20 text-white"
    >
      <div class="absolute z-40 w-screen h-screen bg-gray-700 opacity-75"></div>
      <div
        class="absolute inset-y-0 mx-auto w-screen flex flex-col justify-center items-center space-y-4 z-50"
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#fff"
        >
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
        <h1>{{ loadingSentences[i] }}</h1>
      </div>
    </div>
    <div>
      <ViewHeader heading="Analyze text" icon="text" />
      <div class="px-4 flex flex-col space-y-4 -mt-6">
        <p class="px-6">
          Paste the ingredients separated by a comma (,) and a space ( ) to
          analyze them.
        </p>
        <textarea
          v-model="text"
          type="text"
          name="text"
          rows="10"
          class="rounded-lg flex-auto w-full bg-brand-pale px-3 py-2 border border-brand-pink outline-none ring-1 ring-brand-pink focus:shadow-brand-pink"
        />
      </div>
      <BrandButton @click="analyzeText(text)" class="mx-auto w-11/12 mt-3"
        >Analyze</BrandButton
      >
    </div>
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
    const analyzedIngredients = ref();
    const analyzedTypes = ref();
    const ingredientsTypes = ref();

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

      const textFormatted = text
        .toLowerCase()
        .replace(/(\n|\r)/gm, "")
        .replace(/.$/, "");
      ingredientsArray.value = textFormatted.split(", ");

      async function compareIngredients(ingredientsArray) {
        const queries = [];
        const analyzed = [];
        const ingredients = [];
        const typedIngredients = [];

        ingredientsArray.forEach((ingredient) => {
          const q = query(
            typesRef,
            where("ingredients", "array-contains", ingredient)
          );
          queries.push(q);
        });
        console.log("queries", queries);

        const compare = () => {
          return Promise.all(
            queries.map((query) => {
              queryDatabase(query);
            })
          );
        };

        const queryDatabase = async (query) => {
          const querySnapshot = await getDocs(query);
          querySnapshot.forEach((doc) => {
            ingredients.push(
              querySnapshot.query._query.filters[0].value.stringValue
            );
            analyzedIngredients.value = ingredients;
            console.log(
              doc.id,
              " => ",
              doc.data(),
              querySnapshot.query._query.filters[0].value.stringValue
            );
            const typedIngredient = {
              ingredient:
                querySnapshot.query._query.filters[0].value.stringValue,
              type: doc.data().name,
              color: doc.data().color,
            };

            analyzed.push(doc.data());
            analyzedTypes.value = analyzed;

            typedIngredients.push(typedIngredient);
            ingredientsTypes.value = typedIngredients;
            progressOrStopExecution();
          });
        };
        try {
          compare();

          const exceptionTimeout = setTimeout(() => {
            try {
              throw new Error(`Throw an exception.`);
            } catch (error) {
              loading.value = false;
              toast.error(
                "Oops! Could not analyze it. Try again or use analyze from text function.",
                {
                  position: "bottom-right",
                  timeout: 3000,
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
                }
              );
            }
          }, 10000);
        } catch (error) {
          loading.value = false;
          console.log(error);
          toast.error(
            "Oops, something went wrong. Retake the photo and try again!",
            {
              position: "bottom-right",
              timeout: 3000,
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
            }
          );
        }
      }

      async function progressOrStopExecution() {
        if (analyzedIngredients.value) {
          await saveScan(
            scanName.value,
            text,
            ingredientsArray.value,
            analyzedTypes.value,
            analyzedIngredients.value,
            ingredientsTypes.value
          ).catch((error) => {
            console.log(error);
          });
          loading.value = false;
          // kill timeout
          const highestId = window.setTimeout(() => {
            for (let i = highestId; i >= 0; i--) {
              window.clearInterval(i);
            }
          }, 0);
          await router.push({
            name: "analyzed",
            params: {
              id: scanName.value,
            },
          });
        } else {
          loading.value = false;
          toast.error(
            "Oops! Could not analyze it. Try again or use analyze from text function.",
            {
              position: "bottom-right",
              timeout: 4000,
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
            }
          );
        }
      }

      await compareIngredients(ingredientsArray.value);
    };

    const saveScan = async (
      scanName,
      text,
      ingredientsArray,
      analyzedTypes,
      analyzedIngredients,
      ingredientsTypes
    ) => {
      const add = {
        ...{
          date: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
          id: scanName,
          text: text,
          scannedIngredients: ingredientsArray,
          analyzedTypes: analyzedTypes,
          analyzedIngredients: analyzedIngredients,
          ingredientsTypes: ingredientsTypes,
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

    return { router, text, analyzeText, loading, loadingSentences, i };
  },
};
</script>
