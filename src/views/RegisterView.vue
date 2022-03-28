<template>
  <div class="bg-brand-nude h-full flex flex-col space-y-6">
    <Banner withSlogan class="" />
    <div class="px-10">
      <h1 class="text-2xl font-medium pb-8">Create a new account</h1>
      <Form
        :validation-schema="schema"
        id="registerForm"
        @submit="handleEmailRegister"
      >
        <Field name="email" v-model="registerForm.email"
          ><InputField
            v-model="registerForm.email"
            name="email"
            type="text"
            label="Email address"
            :rules="schema.email"
            placeholder="hello@example.com"
          ></InputField
        ></Field>
        <ErrorMessage class="text-red-600 text-xs flex mt-1" name="email" />
        <Field name="password" v-model="registerForm.password">
          <InputField
            v-model="registerForm.password"
            name="password"
            type="password"
            label="Password"
            class="mt-8"
            :rules="schema.password"
            placeholder="******"
          ></InputField>
        </Field>
        <ErrorMessage class="text-red-600 text-xs flex mt-1" name="password" />
        <div v-show="serverErrorMessage" class="text-red-600 text-xs flex mt-1">
          {{ serverErrorMessage }}
        </div>

        <BrandButton type="submit" class="w-2/3 mx-auto mb-4 mt-16"
          >Register</BrandButton
        >
      </Form>
      <p class="text-sm mt-4">
        Have an account?
        <router-link to="/login" class="font-medium">Login</router-link>
      </p>
    </div>
    <div class="bg-brand-nude pt-4 pb-8">
      <BrandButton
        @click="() => handleSocialSubmit('google')"
        class="mx-auto flex flex-row inset-x-0 bottom-20"
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
  </div>
</template>

<script>
import InputField from "../components/InputField.vue";
import BrandButton from "../components/BrandButton.vue";
import { useState } from "../composables/state";
import useAuth from "../services/useAuth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
    const { signInGoogleUser } = useAuth();
    const auth = getAuth();

    const schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    });

    const registerForm = reactive({
      email: "",
      password: "",
    });

    const handleEmailRegister = async (registerForm) => {
      try {
        const { email, password } = registerForm;
        await createUserWithEmailAndPassword(auth, email, password);
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
      handleEmailRegister,
      handleSocialSubmit,
      serverErrorMessage,
      schema,
      registerForm,
    };
  },
};
</script>
