<template>
  <nav
    class="font-koho z-30 fixed bottom-0 w-full bg-brand-nude text-brand-purple shadow-xl flex flex-row items-center justify-between px-6 pt-4 pb-8 text-xs"
  >
    <RouterLink
      to="/"
      class="flex flex-col justify-center items-center space-y-3"
      v-slot="{ isActive }"
    >
      <img
        v-if="!isActive"
        src="../assets/icons/dashboard-inactive.svg"
        alt="dashboard-icon"
      />
      <img
        v-else
        src="../assets/icons/dashboard-active.svg"
        alt="dashboard-icon"
      />
      <span :class="isActive ? 'font-semibold' : ''">Dashboard</span>
    </RouterLink>
    <RouterLink
      to="/education"
      class="flex flex-col justify-center items-center space-y-2.5"
      v-slot="{ isActive }"
    >
      <img
        v-if="!isActive"
        src="../assets/icons/education-inactive.svg"
        alt="education-icon"
      />
      <img
        v-else
        src="../assets/icons/education-active.svg"
        alt="education-icon"
      />
      <span :class="isActive ? 'font-semibold' : ''"
        >Education</span
      ></RouterLink
    >
    <RouterLink
      to="/scanner"
      class="flex flex-col justify-center items-center space-y-2.5"
      v-slot="{ isActive }"
    >
      <img src="../assets/icons/scan.svg" alt="scanner-icon" />
      <span :class="isActive ? 'font-semibold' : ''">Scanner</span>
    </RouterLink>
    <RouterLink
      to="/favourite"
      class="flex flex-col justify-center items-center space-y-2.5"
      v-slot="{ isActive }"
    >
      <img
        v-if="!isActive"
        src="../assets/icons/favourite-inactive.svg"
        alt="favourive-icon"
      />
      <img
        v-else
        src="../assets/icons/favourite-active.svg"
        alt="favourite-icon"
      />
      <span :class="isActive ? 'font-semibold' : ''">Favourite</span>
    </RouterLink>
    <RouterLink
      to="/settings"
      class="flex flex-col justify-center items-center space-y-2.5"
      v-slot="{ isActive }"
    >
      <img
        v-if="!isActive"
        src="../assets/icons/settings-inactive.svg"
        alt="setting-icon"
      />
      <img
        v-else
        src="../assets/icons/settings-active.svg"
        alt="settings-icon"
      />
      <span :class="isActive ? 'font-semibold' : ''">Settings</span>
    </RouterLink>
  </nav>
</template>

<script>
export default {
  name: "TabBar",
  setup() {},
};
</script>
