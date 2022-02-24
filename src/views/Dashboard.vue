<template>
  <EmptyState
    v-if="false"
    topText="You haven't scanned anything yet."
    bottomText="Use the scanner."
  />
  <div v-else>
    <ViewHeader heading="Your previous scans" icon="time" />
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
  components: { EmptyState, ViewHeader, ScanListItem },
};
</script>
