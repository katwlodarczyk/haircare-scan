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
      v-if="articlesData"
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
    <div v-else class="my-16">
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

    const getArticlesData = async () => {
      const articlesSnap = await getArticles();
      let articles = [];
      if (articlesSnap.size) {
        articlesSnap.forEach((doc) => {
          articles.push({ ...doc.data(), ...{ id: doc.id } });
        });
        articlesData.value = articles;
      }
    };

    onMounted(() => {
      getArticlesData();
    });

    return { getArticlesData, articlesData };
  },
};
</script>
