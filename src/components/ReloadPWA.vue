<template>
  <div
    v-if="offlineReady || needRefresh"
    class="pwa-message bg-brand-purple w-full p-4 fixed top-0 left-0 right-0 text-white shadow-md flex flex-col text-center text-sm"
    role="alert"
  >
    <div class="message mb-2">
      <span v-if="offlineReady"> App ready to work offline </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <button v-if="needRefresh" @click="updateServiceWorker()">Reload</button>
    <button @click="close">Close</button>
  </div>
</template>

<script setup>
import { useRegisterSW } from "virtual:pwa-register/vue";

const reloadSW = "__RELOAD_SW__";
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegistered(r) {
    if (reloadSW === "true") {
      r &&
        setInterval(async () => {
          console.log("Checking for sw update");
          await r.update();
        }, 20000);
    } else {
      console.log(`SW Registered: ${r}`);
    }
  },
});
const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};
</script>

<style>
.pwa-message button {
  border: 1px solid #ffffff;
  outline: none;
  margin-right: 5px;
  border-radius: 4px;
  padding: 3px 10px;
}
</style>
