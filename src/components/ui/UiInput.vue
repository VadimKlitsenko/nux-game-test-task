<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

import { REGEX } from '@/consts'

withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: ''
  }
)

const [model, modifiers] = defineModel({
  set(value: string): string {
    if (modifiers.letters) {
      return value.replace(REGEX.NON_LETTER_CHARS, '')
    } else if (modifiers.phone) {
      return value.replace(REGEX.NON_PHONE_NUMBER_CHARS, '')
    }

    return value
  }
})

const checkInputValue = (e: InputEvent): void => {
  if ((e.target as InputHTMLAttributes).value !== model.value) {
    (e.target as InputHTMLAttributes).value = model.value
  }
}
</script>

<template>
  <input
    v-model="model"
    :placeholder="placeholder"
    class="ui-input"
    @input="checkInputValue"
  >
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.ui-input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: $color-white-01;
  color: $color-grey-01;
  font-size: 17px;

  &::placeholder {
    color: $color-grey-01;
  }
}
</style>