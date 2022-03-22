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
    <div v-if="!loading && articleData" class="mx-auto">
      <img class="mx-auto w-1/2" :src="articleData.image" />
      <div>
        <h1 class="mb-6 font-medium text-xl mx-auto">
          {{ articleData.title }}
        </h1>
        <Markdown
          breaks
          linkify
          typographer
          class="text-left"
          :source="source"
        />
      </div>
    </div>
    <div v-else class="animate-pulse flex flex-col">
      <div
        class="rounded-lg bg-brand-purple self-center opacity-10 h-36 w-36 shadow-sm shadow-brand-purple/10"
      ></div>
      <div
        class="rounded-lg bg-brand-purple self-center opacity-10 mt-4 h-4 w-44 shadow-sm shadow-brand-purple/10"
      ></div>
      <div
        class="rounded-lg bg-brand-purple self-center opacity-10 mt-4 h-3 w-full shadow-sm shadow-brand-purple/10"
      ></div>
      <div
        class="rounded-lg bg-brand-purple self-center opacity-10 mt-4 h-3 w-full shadow-sm shadow-brand-purple/10"
      ></div>
      <div
        class="rounded-lg bg-brand-purple self-center opacity-10 mt-4 h-3 w-full shadow-sm shadow-brand-purple/10"
      ></div>
      <div
        class="rounded-lg bg-brand-purple self-center opacity-10 mt-4 h-3 w-full shadow-sm shadow-brand-purple/10"
      ></div>
      <div
        class="rounded-lg bg-brand-purple self-center opacity-10 mt-4 h-3 w-full shadow-sm shadow-brand-purple/10"
      ></div>
      <div
        class="rounded-lg bg-brand-purple self-center opacity-10 mt-4 h-3 w-full shadow-sm shadow-brand-purple/10"
      ></div>
      <div
        class="rounded-lg bg-brand-purple self-center opacity-10 mt-4 h-3 w-full shadow-sm shadow-brand-purple/10"
      ></div>
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
import Markdown from "vue3-markdown-it";
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default {
  components: {
    Markdown,
  },
  setup(params, context) {
    const router = useRouter;
    const route = useRoute;
    const articleData = ref();
    const db = getFirestore();
    const source = ref();
    const loading = ref(false);
    const getArticleData = async () => {
      loading.value = true;
      const docRef = doc(db, "articles", context.attrs.articleId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        articleData.value = docSnap.data();
        source.value = articleData.value.body.replaceAll("\\n", "\n");
        loading.value = false;
      } else {
        console.log("No article!");
        loading.value = false;
      }
    };

    onMounted(() => {
      getArticleData();
    });

    return { router, route, articleData, source, loading };
  },
};
</script>
