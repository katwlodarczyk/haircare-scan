<template>
  <div class="bg-brand-nude h-screen flex flex-col space-y-10">
    <Banner withSlogan class="" />
    <div class="px-10">
      <h1 class="text-2xl font-medium pb-8">Login to your account</h1>
      <Form
        :validation-schema="schema"
        id="loginForm"
        @submit="handleEmailLogin"
      >
        <Field name="email" v-model="loginForm.email">
          <InputField
            v-model="loginForm.email"
            name="email"
            type="text"
            label="Email address"
            :rules="schema.email"
            placeholder="hello@example.com"
            :server-error-message="serverErrorMessage"
          ></InputField>
        </Field>
        <ErrorMessage class="text-red-600 text-xs flex mt-1" name="email" />
        <Field name="password" v-model="loginForm.password">
          <InputField
            v-model="loginForm.password"
            name="password"
            type="password"
            label="Password"
            class="mt-8"
            :rules="schema.password"
            placeholder="******"
            :server-error-message="serverErrorMessage"
          ></InputField>
        </Field>
        <ErrorMessage class="text-red-600 text-xs flex mt-1" name="password" />
        <div v-show="serverErrorMessage" class="text-red-600 text-xs flex mt-1">
          {{ serverErrorMessage }}
        </div>

        <BrandButton type="submit" class="w-2/3 mx-auto mb-4 mt-10"
          >Login</BrandButton
        >
      </Form>
      <p class="text-sm">
        or
        <router-link to="/register" class="font-medium"
          >Create an account</router-link
        >
      </p>
    </div>
    <BrandButton
      class="mx-auto mt-12 flex flex-row fixed inset-x-0 bottom-20"
      type="dark"
      text="xs"
    >
      or use your
      <img
        src="../assets/icons/google-icon.svg"
        alt="google icon"
        class="px-2"
      />
      account
    </BrandButton>
  </div>
</template>

<script>
import InputField from "../components/InputField.vue";
import BrandButton from "../components/BrandButton.vue";
import { useState } from "../composables/state";
import useAuth from "../services/useAuth";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Banner from "../components/Banner.vue";

export default {
  components: { Banner, InputField, BrandButton, Form, Field, ErrorMessage },
  setup() {
    const router = useRouter();
    const [serverErrorMessage, setServerErrorMessage] = useState();
    const { signInEmailUser, signInGoogleUser } = useAuth();

    const schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    });

    const loginForm = reactive({
      email: "",
      password: "",
    });

    const handleEmailLogin = async (registerForm) => {
      try {
        const { email, password } = registerForm;
        await signInEmailUser(email, password);
        await router.replace("/dashboard");
      } catch (error) {
        setServerErrorMessage(error.message);
      }
    };

    const handleSocialSubmit = async (method) => {
      try {
        if (method === "google") {
          await signInGoogleUser();
        }
        await router.replace("/dashboard");
      } catch (error) {
        console.log("error");
      }
    };

    return {
      handleEmailLogin,
      handleSocialSubmit,
      serverErrorMessage,
      schema,
      loginForm,
    };
  },
};
</script>
