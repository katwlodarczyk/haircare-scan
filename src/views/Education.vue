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
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
    >
      <article-card></article-card>
      <article-card></article-card>
      <article-card></article-card>
      <article-card></article-card>
    </div>
  </div>
</template>

<script>
import ArticleCard from "../components/ArticleCard.vue";
export default {
  components: { ArticleCard },
  setup() {},
};
</script>
