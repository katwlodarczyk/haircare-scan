<template>
  <EmptyDashboard v-if="true"/>
  <div v-else></div>
</template>

<script>
import EmptyDashboard from "../components/EmptyDashboard.vue";
export default {
  components: { EmptyDashboard },
};
</script>
