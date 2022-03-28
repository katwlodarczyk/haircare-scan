<template>
  <div class="bg-brand-nude h-screen flex flex-col space-y-10">
    <Banner withSlogan class="" />
    <div class="px-10 pt-10">
      <h1 class="text-2xl font-medium pb-4">Forgot your password?</h1>
      <p class="px-4 text-sm pb-14">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <Form
        :validation-schema="schema"
        id="forgotPasswordForm"
        @submit="resetPasswordSubmit"
      >
        <Field name="email" v-model="resetPasswordForm.email">
          <InputField
            v-model="resetPasswordForm.email"
            name="email"
            type="text"
            label="Email address"
            :rules="schema.email"
            placeholder="hello@example.com"
            :server-error-message="serverErrorMessage"
          ></InputField>
        </Field>
        <ErrorMessage class="text-red-600 text-xs flex mt-1" name="email" />
        <div v-show="serverErrorMessage" class="text-red-600 text-xs flex mt-1">
          {{ serverErrorMessage }}
        </div>

        <BrandButton type="submit" class="w-2/3 mx-auto mb-6 mt-8"
          >Reset password</BrandButton
        >
      </Form>
      <p class="text-sm">
        or
        <router-link to="/register" class="font-medium"
          >Create an account</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner.vue";
import InputField from "../components/InputField.vue";
import BrandButton from "../components/BrandButton.vue";
import { useState } from "../composables/state";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
  components: { Banner, InputField, BrandButton, Form, Field, ErrorMessage },
  setup() {
    const router = useRouter();
    const [serverErrorMessage, setServerErrorMessage] = useState();

    const schema = yup.object().shape({
      email: yup.string().required().email(),
    });

    const resetPasswordForm = reactive({
      email: "",
    });

    const resetPasswordSubmit = async (resetPasswordForm) => {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, resetPasswordForm.email)
        .then(async () => {
          await router.replace("/reset-password-sent");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          setServerErrorMessage(errorMessage);
        });
    };

    return {
      serverErrorMessage,
      schema,
      resetPasswordForm,
      resetPasswordSubmit,
    };
  },
};
</script>
