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
            <div v-if="openEmailEdit === true">
              <input
                type="text"
                name="email"
                placeholder="jane@example.com"
                class="rounded-lg bg-brand-pale px-2 border border-brand-pink outline-none ring-1 ring-brand-pink focus:shadow-brand-pink"
              />
            </div>
            <span v-else class="">jane@example.com</span>
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
          class="h-6 w-6 self-end text-brand-pink"
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
        <div class="flex flex-row space-x-4">
          <span>Password:</span>
          <div class="font-medium">
            <div v-if="openPasswordEdit === true">
              <input
                type="password"
                name="password"
                placeholder="******"
                class="rounded-lg bg-brand-pale px-2 border border-brand-pink outline-none ring-1 ring-brand-pink focus:shadow-brand-pink"
              />
            </div>
            <span v-else class="">******</span>
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
          class="h-6 w-6 self-end text-brand-pink"
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
      <!-- @todo change to haircare scan email + change subject -->
        <a
          href="mailto:katbwlodarczyk@gmail.com?subject=Mail from Our Site"
          class="flex flex-row space-x-4"
          >Contact Us</a
        >
      </div>

      <div
        class="w-full flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-4 text-lg space-x-4"
      >
        <div class="flex flex-row space-x-4">Privacy Policy</div>
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
      </div>

      <div
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
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ViewHeader from "../components/ViewHeader.vue";
export default {
  components: {
    ViewHeader,
  },
  setup() {
    const openEmailEdit = ref(false);
    const openPasswordEdit = ref(false);

    const saveEmailEdit = () => {
      console.log("saved email edit");
      openEmailEdit.value = false;
    };

    const savePasswordEdit = () => {
      console.log("saved password edit");
      openPasswordEdit.value = false;
    };

    return { openEmailEdit, saveEmailEdit, openPasswordEdit, savePasswordEdit };
  },
};
</script>
