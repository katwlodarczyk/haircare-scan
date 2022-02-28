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
      class="mt-1 outline-none focus:ring-brand-pink focus:border-brand-pink block w-full shadow-sm py-3 px-4 rounded-lg"
    />
  </div>
</template>

<script>
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
  },
  emits: ["update:modelValue"],
  setup() {},
};
</script>
