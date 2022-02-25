<template>
  <div class="bg-brand-nude h-screen px-10 flex flex-col justify-center">
    <h1 class="text-2xl font-medium pb-8">Login to your account</h1>
    <InputField name="email" type="text" label="Email address"></InputField>
    <InputField
      name="password"
      type="password"
      label="Password"
      class="mt-4 mb-10"
    ></InputField>
    <BrandButton class="w-2/3 mx-auto mb-4" text="Login"></BrandButton>
    <p class="text-sm">
      or
      <router-link to="/register" class="font-medium"
        >Create an account</router-link
      >
    </p>
  </div>
</template>

<script>
import InputField from "../components/InputField.vue";
import BrandButton from "../components/BrandButton.vue";
export default {
  setup() {},
  components: { InputField, BrandButton },
};
</script>
