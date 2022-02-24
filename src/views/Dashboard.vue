<template>
  <EmptyState
    v-if="false"
    topText="You haven't scanned anything yet."
    bottomText="Use the scanner."
  />
  <div v-else>
    <ViewHeader heading="Your previous scans" icon="time" />
  </div>
</template>

<script>
import EmptyState from "../components/EmptyState.vue";
import ViewHeader from "../components/ViewHeader.vue";
export default {
  components: { EmptyState, ViewHeader },
};
</script>
