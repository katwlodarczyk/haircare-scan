<template>
  <div>
    <label :for="name" class="block pb-1.5">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :name="name"
      :id="name"
      autocomplete
      :placeholder="placeholder"
      class="mt-1 outline-none block w-full shadow-sm py-3 px-4 rounded-lg"
      :class="
        !meta.valid && meta.validated || serverErrorMessage
          ? 'border border-red-600 text-red-600 focus:ring-red-600 focus:border-red-600'
          : 'focus:ring-brand-pink focus:border-brand-pink'
      "
    />
  </div>
</template>

<script>
import { useField } from 'vee-validate';

export default {
  props: {
    modelValue: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    serverErrorMessage: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    const { value, meta } = useField(props.name, undefined, {
      initialValue: '',
    });

    return {
      value,
      meta,
    };
  },
};
</script>
