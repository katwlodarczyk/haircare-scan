<template>
  <div>
    <ViewHeader heading="Settings" icon="setting" />
    <div>
      <div
        class="w-full flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-4 text-lg space-x-4"
      >
        <div class="flex flex-row space-x-4">
          <span>Email:</span>
          <div class="font-medium">
            <input
              v-if="openEmailEdit === true"
              v-model="newEmail"
              type="text"
              name="email"
              :placeholder="user.email"
              class="shrink rounded-lg bg-brand-pale px-2 border border-brand-pink outline-none ring-1 ring-brand-pink focus:shadow-brand-pink"
            />
            <span v-else class="">{{ user.email }}</span>
          </div>
        </div>
        <svg
          @click="openEmailEdit = true"
          v-if="openEmailEdit === false"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 self-end text-brand-purple"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <svg
          @click="saveEmailEdit"
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 self-end shrink-0 text-brand-pink"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div
        class="w-screen flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-4 text-lg space-x-4"
      >
        <div class="flex flex-row space-x-4">
          <span>Password:</span>
          <div class="font-medium">
            <input
              v-if="openPasswordEdit === true"
              v-model="newPassword"
              type="password"
              name="password"
              placeholder="*********"
              class="rounded-lg flex-auto w-full bg-brand-pale px-2 border border-brand-pink outline-none ring-1 ring-brand-pink focus:shadow-brand-pink"
            />

            <span v-else class="">**********</span>
          </div>
        </div>
        <svg
          @click="openPasswordEdit = true"
          v-if="openPasswordEdit === false"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 self-end text-brand-purple"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <svg
          @click="savePasswordEdit"
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 self-end shrink-0 text-brand-pink"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div
        class="w-full flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-4 text-lg space-x-4"
      >
        <a
          href="mailto:haircare.scan@gmail.com?subject=Mail about HairCare Scan app"
          class="flex flex-row space-x-4"
          >Contact Us</a
        >
      </div>

      <div
        @click="$router.push({ name: 'privacy-policy' })"
        class="w-full flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-4 text-lg space-x-4"
      >
        <div class="flex flex-row space-x-4">Privacy Policy</div>
      </div>

      <!-- <div
        class="w-full flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-4 text-lg space-x-4"
      >
        <div class="flex flex-row space-x-4">Terms of Service</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-brand-purple"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div> -->
    </div>
    <BrandButton @click="signOut" class="mx-auto w-11/12 mt-3"
      >Sign out</BrandButton
    >
  </div>
</template>

<script>
import { ref } from "vue";
import ViewHeader from "../components/ViewHeader.vue";
import BrandButton from "../components/BrandButton.vue";
import useAuth from "../services/useAuth";
import { useRouter } from "vue-router";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { useToast } from "vue-toastification";

export default {
  components: {
    ViewHeader,
    BrandButton,
  },
  setup() {
    const toast = useToast();
    const router = useRouter();
    const { user, signUserOut } = useAuth();
    const openEmailEdit = ref(false);
    const openPasswordEdit = ref(false);
    const newEmail = ref();
    const newPassword = ref();
    const auth = getAuth();

    const saveEmailEdit = () => {
      if (user.email !== newEmail.value && newEmail.value) {
        updateEmail(auth.currentUser, newEmail.value)
          .then(() => {
            toast.success("Email address has been changed", {
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
              icon: true,
              rtl: false,
            });
            openEmailEdit.value = false;
            newEmail.value = "";
          })
          .catch((error) => {
            console.log(error);
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
      } else {
        openEmailEdit.value = false;
      }
    };

    const savePasswordEdit = () => {
      if (newPassword.value) {
        updatePassword(auth.currentUser, newPassword.value)
          .then(() => {
            toast.success("Password has been changed", {
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
              icon: true,
              rtl: false,
            });
          })
          .then(() => {
            openPasswordEdit.value = false;
            newPassword.value = undefined;
          })
          .catch((error) => {
            console.log(error);
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
      } else {
        openPasswordEdit.value = false;
      }
    };

    const signOut = async () => {
      try {
        await signUserOut();
        await localStorage.removeItem("userUID");
        await router.replace("/");
      } catch (e) {
        console.log(e.message);
      }
    };

    return {
      openEmailEdit,
      saveEmailEdit,
      openPasswordEdit,
      savePasswordEdit,
      signOut,
      user,
      newEmail,
      newPassword,
    };
  },
};
</script>
