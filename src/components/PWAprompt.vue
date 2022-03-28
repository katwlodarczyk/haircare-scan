<template>
  <transition name="fade-up-in" appear>
    <div class="">
      <div
        v-if="shown"
        @click="installPWA"
        class="z-30 bg-brand-pink absolute bottom-0 left-o right-0 rounded-t-3xl text-white py-8 text-xl flex flex-col w-full"
        :class="[{ shown }]"
      >
        Download on you phone
      </div>
      <IOSprompt v-if="showIOSprompt" @close-prompt="close"></IOSprompt>
    </div>
  </transition>
</template>

<script>
import { onBeforeMount, ref } from "vue";
// import { PWAPrompt as IOSPrompt } from "vue2-ios-pwa-prompt";
import IOSprompt from "../components/IOSprompt.vue";

export default {
  components: {
    IOSprompt,
  },
  props: {
    installed: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const showIOSprompt = ref(false);
    const shown = ref(props.installed ? false : true);
    let isIOS = /OS 1([3-9])_([4-9])/.test(window.navigator.userAgent);
    let installEvent = null;

    onBeforeMount(() => {
      captureEvent();

      window.addEventListener("appinstalled", (e) => {
        console.log(e);
      });
    });

    const captureEvent = () => {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        installEvent = e;
        shown.value = true;
      });
    };

    function installPWA() {
      showIOSprompt.value = true;
      installEvent.prompt();
      installEvent.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("install app");
          dismissPrompt();
        } else {
          console.log("do not install app");
        }
        installEvent = null;
      });
    }
    function dismissPrompt() {
      shown.value = false;
    }

    function close() {
      showIOSprompt.value = false;
    }

    return { shown, installPWA, isIOS, showIOSprompt, close };
  },
};
</script>

<style scoped>
.fade-up-in-enter-active,
.fade-up-in-leave-active {
  transition: opacity 1s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 1s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: translateY(0);
}
.fade-up-in-enter,
.fade-up-in-leave-to {
  opacity: 0;
  transform: translateY(4rem);
}
</style>
