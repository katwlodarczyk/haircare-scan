<template>
  <EmptyState
    v-if="false"
    withArrow="false"
    topText="You don't have any favourite scans yet."
  />
  <div v-else>
    <ViewHeader heading="Your favourite scans" icon="heart" />
    <div>
      <ScanListItem title="Garnier Ultimate Blends Argan Richness" />
      <ScanListItem title="Garnier Ultimate Blends Argan Richness" />
    </div>
  </div>
</template>

<script>
import EmptyState from "../components/EmptyState.vue";
import ViewHeader from "../components/ViewHeader.vue";
import ScanListItem from "../components/ScanListItem.vue";

export default {
  components: {
    EmptyState,
    ViewHeader,
    ScanListItem,
  },
  setup() {},
};
</script>
