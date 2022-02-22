<template>
  <nav
    class="z-30 fixed bottom-0 w-full bg-brand-nude text-brand-purple shadow-xl flex flex-row items-center justify-between px-7 pt-4 pb-8 text-xs"
  >
    <RouterLink
      to="/"
      class="flex flex-col justify-center items-center space-y-2.5"
    >
      <img src="./icons/dashboard-inactive.svg" alt="dashboard-icon" />
      <!-- <img src="./icons/dashboard-active.svg" alt="dashboard-icon" /> -->
      <span>Dashboard</span>
    </RouterLink>
    <RouterLink
      to="/education"
      class="flex flex-col justify-center items-center space-y-2.5"
      >
      <img src="./icons/education-inactive.svg" alt="education-icon" />
      <!-- <img src="./icons/dashboard-active.svg" alt="education-icon" /> -->
      <span>Education</span></RouterLink
    >
    <RouterLink
      to="/scanner"
      class="flex flex-col justify-center items-center space-y-2.5"
      >
      <img src="./icons/scan.svg" alt="scanner-icon" />
      <span>Scanner</span>
      </RouterLink
    >
    <RouterLink
      to="/favourite"
      class="flex flex-col justify-center items-center space-y-2.5"
      >
      <img src="./icons/favourite-inactive.svg" alt="favourive-icon" />
      <!-- <img src="./icons/dashboard-active.svg" alt="favourite-icon" /> -->
      <span>Favourite</span>
      </RouterLink
    >
    <RouterLink
      to="/settings"
      class="flex flex-col justify-center items-center space-y-2.5"
      >
      <img src="./icons/settings-inactive.svg" alt="setting-icon" />
      <!-- <img src="./icons/settings-active.svg" alt="settings-icon" /> -->
      <span>Settings</span>
      </RouterLink
    >
  </nav>
</template>

<script>
export default {
  name: "TabBar",
  setup() {},
};
</script>
