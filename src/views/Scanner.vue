<template>
  <div class="py-0">
    <div
      v-show="loading === true"
      class="w-screen h-screen absolute z-20 text-white"
    >
      <div class="absolute z-10 w-screen h-screen bg-gray-700 opacity-75"></div>
      <div
        class="absolute inset-y-0 mx-auto w-screen flex flex-col justify-center items-center space-y-4 z-30"
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
    <div
      class="bg-gray-800 w-screen h-screen flex flex-col justify-between py-6"
    >
      <svg
        @click="$router.back()"
        xmlns="http://www.w3.org/2000/svg"
        class="self-end mr-4 text-white h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>

      <video
        v-show="!isPhotoTaken"
        ref="camera"
        :width="375"
        :height="600"
        autoplay
        playsinline
      ></video>
      <canvas
        id="photoTaken"
        v-show="isPhotoTaken"
        ref="canvas"
        :width="375"
        :height="600"
      ></canvas>

      <div
        class="w-full flex flex-row justify-between items-center text-white px-6"
        :class="!isPhotoTaken ? 'mx-auto' : ''"
      >
        <BrandButton
          v-show="isPhotoTaken"
          @click="retake"
          class="flex justify-between items-center space-x-2"
        >
          <span>Retake</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </BrandButton>
        <svg
          v-show="!isPhotoTaken"
          @click="takePhoto()"
          class="mx-auto z-30 fill-current text-white"
          width="64"
          height="64"
          viewBox="0 0 48 48"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M29.525 13.4853C30.735 13.4853 31.897 13.9619 32.743 14.8111C33.595 15.6681 34.067 16.8194 34.065 18.0177V20.5084C34.055 20.8006 33.817 21.0379 33.519 21.0457H14.479C14.183 21.0359 13.945 20.7986 13.9388 20.5084V18.0177C13.917 15.5367 15.949 13.5108 18.477 13.4853H29.525ZM34.3872 6.00059C38.7812 6.00059 42.3532 9.50329 42.3532 13.8121V17.5246C42.3532 18.3483 41.6732 19.019 40.8312 19.019C39.9912 19.019 39.3092 18.3483 39.3092 17.5246V13.8121C39.3092 11.1507 37.1012 8.98554 34.3872 8.98554H31.2012C30.3612 8.98554 29.6792 8.31873 29.6792 7.49502C29.6792 6.66936 30.3612 6.00059 31.2012 6.00059H34.3872ZM16.8554 6C17.6954 6 18.3774 6.66877 18.3774 7.49444C18.3774 8.31814 17.6974 8.98691 16.8554 8.98691L13.5974 8.98887C10.8934 8.99279 8.6934 11.1521 8.6934 13.8056V17.524C8.6934 18.3477 8.0094 19.0185 7.1694 19.0185C6.3294 19.0185 5.6474 18.3477 5.6474 17.524V13.8056C5.6474 9.50663 9.2134 6.00588 13.5954 6.00196L16.8554 6Z"
            fill="#ffffff"
          />
          <path
            d="M44.478 24.0825H3.524C2.684 24.0825 2 24.7512 2 25.5769C2 26.4006 2.684 27.0674 3.524 27.0674H5.646V34.1944C5.646 38.4934 9.214 41.9941 13.596 41.998L16.854 42C17.696 42 18.376 41.3312 18.378 40.5056C18.378 39.6818 17.696 39.0131 16.856 39.0131L13.6 39.0111C10.894 39.0072 8.692 36.8479 8.692 34.1944V27.0674H13.938V29.0502C13.918 31.5311 15.948 33.559 18.476 33.5825H29.524C32.054 33.559 34.084 31.5311 34.064 29.0502V27.0674H39.31V34.1866C39.31 36.8499 37.102 39.0131 34.388 39.0131H31.202C30.36 39.0131 29.678 39.6818 29.678 40.5056C29.678 41.3312 30.36 42 31.202 42H34.388C38.78 42 42.354 38.4973 42.354 34.1866V27.0674H44.478C45.318 27.0674 46 26.4006 46 25.5769C46 24.7512 45.318 24.0825 44.478 24.0825Z"
            fill="#ffffff"
          />
        </svg>
        <BrandButton
          @click="analyze(capturedImage)"
          v-show="isPhotoTaken"
          type="dark"
          class="flex justify-between items-center space-x-2"
        >
          <span>Analyze</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </BrandButton>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref as ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import BrandButton from "../components/BrandButton.vue";
import { createWorker, PSM, OEM } from "tesseract.js";
import { useToast } from "vue-toastification";
import {
  getStorage,
  ref as storageRef,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { DateTime } from "luxon";

export default {
  components: {
    BrandButton,
  },
  setup() {
    const db = getFirestore();
    const toast = useToast();
    const userUID = localStorage.getItem("userUID");
    const capturedImageName = ref("");
    const storage = getStorage();
    const router = useRouter();
    const route = useRoute();
    // Get a reference of the component
    const camera = ref();
    const canvas = ref();
    const capturedImage = ref();
    const base64CapturedImage = ref();
    const base64Strip = ref();
    const loading = ref(false);
    const loadingSentences = [
      "Recognizing ingredients...",
      "Analyzing the types...",
      "Saving the scan...",
      "Preparing the view...",
    ];
    let i = ref(0);

    const metadata = {
      contentType: "image/png",
    };

    onMounted(() => {
      loading.value = true;
      createCameraElement();
      loading.value = false;
    });

    const isCameraOpen = ref(true);
    const isPhotoTaken = ref(false);

    function createCameraElement() {
      const constraints = (window.constraints = {
        audio: false,
        video: {
          facingMode: "environment",
          width: { min: 375, ideal: 1280 },
          height: { min: 600, ideal: 2048 },
          aspectRatio: 1.33,
        },
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          camera.value.srcObject = stream;
        })
        .catch((error) => {
          console.log(error);
          router.back();
        });
    }

    function stopCameraStream() {
      const tracks = camera.value.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      router.back();
    }

    function takePhoto() {
      canvas.value.width = camera.value.scrollWidth;
      canvas.value.height = camera.value.scrollHeight;
      this.isPhotoTaken = !this.isPhotoTaken;
      const context = canvas.value.getContext("2d");
      const photoFromVideo = camera.value;
      context.imageSmoothingEnabled = false;
      context.drawImage(
        photoFromVideo,
        0,
        0,
        canvas.value.width,
        canvas.value.height
      );
      capturedImage.value = document
        .getElementById("photoTaken")
        .toDataURL("image/png", 1);
      base64Strip.value = capturedImage.value.replace(
        "data:image/png;base64,",
        ""
      );
      const blob = document
        .getElementById("photoTaken")
        .toBlob(function (blob) {
          const url = URL.createObjectURL(blob);
          getNameFromUrl(url);
        });
    }

    function getNameFromUrl(url) {
      const urlArray = url.split("/");
      capturedImageName.value = urlArray.pop();
    }

    const retake = () => {
      capturedImage.value = "";
      isPhotoTaken.value = !isPhotoTaken.value;
    };

    const worker = createWorker({
      // logger: (m) => console.log(m),
    });

    const analyze = async (capturedImage) => {
      loading.value = true;

      setInterval(() => {
        if (i.value < loadingSentences.length - 1) i.value++;
        else i.value = 0;
      }, 6000);

      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng", OEM.LSTM_ONLY);
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });
      const {
        data: { text },
      } = await worker.recognize(capturedImage);
      console.log("text", text);

      const scanStorage = storageRef(
        storage,
        `users-scans/${userUID}/${capturedImageName.value}.png`
      );

      await uploadString(scanStorage, base64Strip.value, "base64", metadata)
        .then((snapshot) => {
          console.log("Uploaded a base64url string!");
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            saveScan(capturedImageName.value, downloadURL, text);
          });
        })
        .catch((error) => {
          loading.value = false;
          toast.error(error.message, {
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
        });

      loading.value = false;
      await router.push({
        name: "analyzed",
        params: {
          id: capturedImageName.value,
          scan: base64CapturedImage.value,
        },
      });
    };

    const saveScan = async (capturedImageName, scanRef, text) => {
      const add = {
        ...{
          date: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
          id: capturedImageName,
          scanRef: scanRef,
          text: text,
        },
      };

      const scanFile = doc(db, `scans-${userUID}`, `${capturedImageName}`);

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

    return {
      router,
      route,
      camera,
      capturedImage,
      retake,
      analyze,
      loading,
      loadingSentences,
      capturedImageName,
      i,
      takePhoto,
      stopCameraStream,
      isCameraOpen,
      createCameraElement,
      canvas,
      isPhotoTaken,
    };
  },
};
</script>
