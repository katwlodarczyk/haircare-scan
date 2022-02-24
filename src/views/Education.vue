<template>
  <div class="flex-auto mx-auto px-6 ">
    <img class="mb-4 ml-2 px-8" src="../assets/images/education.svg" />
    <h1 class="font-medium text-3xl pb-1">Hair Education</h1>
    <p class="leading-5 mb-5">
      It’s important to get to know our hair and what ingredients they might
      need. As they say- knowledge is power!
    </p>
    <div class="grid grid-cols-2 gap-4">
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
