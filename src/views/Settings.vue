<template>
  <div>
    <ViewHeader heading="Settings" icon="setting" />
    <div>
      <div
        class="w-full flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-4 text-lg space-x-4"
      >
        <div class="flex flex-row space-x-4">
          <span>Email:</span>
          <div class="font-medium">jane@example.com</div>
        </div>
        <svg
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
      </div>

      <div
        class="w-full flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-4 text-lg space-x-4"
      >
        <div class="flex flex-row space-x-4">
          <span>Password:</span>
          <div class="font-medium">******</div>
        </div>
        <svg
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
      </div>

      <div
        class="w-full flex flex-row justify-between odd:bg-brand-pale even:bg-brand-nude px-6 py-4 text-lg space-x-4"
      >
        <div class="flex flex-row space-x-4">Contact Us</div>
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
import ViewHeader from "../components/ViewHeader.vue";
export default {
  components: {
    ViewHeader,
  },
  setup() {},
};
</script>
