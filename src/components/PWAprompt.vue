<template>
  <transition name="fade-up-in" appear>
    <div
      v-if="shown"
      @click="installPWA"
      class="z-30 bg-brand-pink absolute bottom-0 left-o right-0 rounded-t-3xl text-white py-8 text-xl flex flex-col w-full"
      :class="[{ shown }]"
    >
      Download on you phone
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    installed: {
      type: Boolean,
      required: true,
    },
  },
  data: (props) => ({
    installEvent: undefined,
    shown: props.installed ? false : true,
  }),
  beforeMount() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.installEvent = e;
      this.shown = true;
    });
  },
  methods: {
    installPWA() {
      this.installEvent.prompt();
      this.installEvent.userChoice.then((choice) => {
        console.log(choice);
      });
    },
    dismissPrompt() {
      this.shown = false;
    },
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
