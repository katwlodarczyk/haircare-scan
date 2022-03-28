import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const options = {
  transition: "fade",
  position: POSITION.BOTTOM_RIGHT,
};

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPcd8kM5uyhZRmTZjmxdtg82rpF87N56c",
  authDomain: "haircare-scan.firebaseapp.com",
  projectId: "haircare-scan",
  storageBucket: "haircare-scan.appspot.com",
  messagingSenderId: "868432268519",
  appId: "1:868432268519:web:4eefa53d50549cadefa642",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
getStorage(firebaseApp);

const app = createApp(App);

app.use(router);
app.use(Toast, options);

app.mount("#app");
