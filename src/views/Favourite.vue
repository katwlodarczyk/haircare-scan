<template>
  <EmptyState
    v-if="true"
    withArrow="false"
    topText="You don't have any favourite scans yet."
  />
</template>

<script>
import EmptyState from "../components/EmptyState.vue";
export default {
  components: {
    EmptyState,
  },
  setup() {},
};
</script>
