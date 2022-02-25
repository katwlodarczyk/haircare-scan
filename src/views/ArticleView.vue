<template>
  <div class="px-6">
    <div
      @click="$router.back()"
      class="flex flex-row space-x-2 items-center mb-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
        />
      </svg>
      <span>Go back</span>
    </div>

    <div class="mx-auto">
      <img class="mx-auto" :src="articleImage" />
      <div>
        <h1 class="my-6 font-medium text-xl mx-auto">{{ title }}</h1>
        <p class="text-left">
          Lorem duis voluptate ad proident duis sunt culpa anim mollit sint sit.
          Exercitation sit amet adipisicing aliqua sint. Cillum proident sit
          elit sit eiusmod eu officia adipisicing ex sint est officia sit est.
          Laboris ex commodo fugiat minim occaecat qui excepteur officia in
          dolor fugiat. Quis do ullamco pariatur esse dolore labore do aliquip
          minim voluptate consectetur exercitation in aute. Amet amet ex
          adipisicing fugiat et. Nisi duis culpa Lorem labore cillum est
          consectetur officia deserunt laborum dolor consectetur nostrud duis.
          Enim aliqua velit consectetur ullamco amet eu. Voluptate aute ipsum
          laborum eu labore sunt minim sit exercitation.
        </p>
      </div>
    </div>

    <div
      @click="$router.back()"
      class="flex flex-row space-x-2 items-center mt-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
        />
      </svg>
      <span>Go back</span>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
export default {
  props: {
    articleImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter;
    const route = useRoute;
    return { router, route };
  },
};
</script>
