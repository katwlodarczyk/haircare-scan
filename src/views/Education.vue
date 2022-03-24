<template>
  <div class="flex-auto mx-auto px-6">
    <div class="mb-5">
      <img class="mb-4 mx-auto px-8" src="../assets/images/education.svg" />
      <h1 class="font-medium text-3xl pb-1">Hair Education</h1>
      <p>
        It’s important to get to know our hair and what ingredients they might
        need.
      </p>
      <p>As they say- knowledge is power!</p>
    </div>
    <div
      v-if="loading && !articlesData"
      class="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
    >
      <div
        class="rounded-lg bg-brand-purple opacity-10 h-36 w-36 shadow-sm shadow-brand-purple/10"
      ></div>
      <div
        class="rounded-lg bg-brand-purple opacity-10 h-36 w-36 shadow-sm shadow-brand-purple/10"
      ></div>
      <div
        class="rounded-lg bg-brand-purple opacity-10 h-36 w-36 shadow-sm shadow-brand-purple/10"
      ></div>
      <div
        class="rounded-lg bg-brand-purple opacity-10 h-36 w-36 shadow-sm shadow-brand-purple/10"
      ></div>
    </div>
    <div
      v-else-if="!loading && articlesData"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
    >
      <article-card
        v-for="article in articlesData"
        :key="article.id"
        :title="article.title"
        :articleImage="article.image"
        @click="
          $router.push({
            name: 'article',
            params: {
              articleId: article.id,
            },
          })
        "
      ></article-card>
    </div>
    <div v-else-if="!loading && !articleData" class="my-16">
      <h2 class="text-lg pb-1.5">No articles yet.</h2>
      <p class="text-sm">Come back later!</p>
    </div>
  </div>
</template>

<script>
import ArticleCard from "../components/ArticleCard.vue";
import { ref, onMounted } from "vue";
import useArticles from "../services/useArticles.js";

export default {
  components: { ArticleCard },
  setup() {
    const articlesData = ref();
    const { getArticles } = useArticles();
    const loading = ref(false);

    const getArticlesData = async () => {
      loading.value = true;
      const articlesSnap = await getArticles();
      let articles = [];
      if (articlesSnap.size) {
        articlesSnap.forEach((doc) => {
          articles.push({ ...doc.data(), ...{ id: doc.id } });
        });
        articlesData.value = articles;
      }
      loading.value = false;
    };

    onMounted(() => {
      getArticlesData();
    });

    return { getArticlesData, articlesData, loading };
  },
};
</script>
