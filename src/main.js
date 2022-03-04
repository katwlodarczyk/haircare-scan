import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/index.css";
import Toast, { POSITION }  from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
  transition: "fade",
  position: POSITION.BOTTOM_RIGHT,
  // hideProgressBar: true,
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPcd8kM5uyhZRmTZjmxdtg82rpF87N56c",
  authDomain: "haircare-scan.firebaseapp.com",
  projectId: "haircare-scan",
  storageBucket: "haircare-scan.appspot.com",
  messagingSenderId: "868432268519",
  appId: "1:868432268519:web:4eefa53d50549cadefa642",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);
app.use(Toast, options);

app.mount("#app");
