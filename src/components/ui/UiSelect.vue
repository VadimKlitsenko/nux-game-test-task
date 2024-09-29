<script setup lang="ts">
import { ref, computed } from 'vue'

import type { SelectOption, SelectOptionValue } from '@/types/ui'

const props = withDefaults(
  defineProps<{
    options: SelectOption[]
    placeholder?: string
    default?: SelectOptionValue
  }>(),
  {
    default: null,
    placeholder: ''
  }
)

const model = defineModel({ required: true })

const isOpen = ref<boolean>(false)

const selectedLabel = computed<string>(() => {
  return props.options.find((option: SelectOption) => option.value === model.value)?.label ?? ''
})

const toggleOpen = (): void => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: SelectOption): void => {
  model.value = option.value
  isOpen.value = false
}
</script>

<template>
  <div
    class="ui-select"
    tabindex="0"
    @blur="isOpen = false"
  >
    <span
      v-if="placeholder"
      class="ui-select__placeholder"
    >
      {{ placeholder }}
    </span>
    <div
      :class="{ 'ui-select__selected_open': isOpen }"
      class="ui-select__selected"
      @click="toggleOpen"
    >
      {{ selectedLabel }}
    </div>
    <ul
      :class="{ 'ui-select__list_hidden': !isOpen }"
      class="ui-select__list"
    >
      <li
        v-for="(option, index) in options"
        :key="index"
        class="ui-select__item"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.ui-select {
  position: relative;
  min-width: 180px;
  height: 45px;
  line-height: 45px;

  &__placeholder {
    line-height: 1;
    position: absolute;
    bottom: calc(100% + 3px);
    color: $color-white-01;
  }

  &__selected {
    position: relative;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid $color-grey-02;
    background-color: $color-grey-04;
    user-select: none;
    cursor: pointer;
    color: $color-white-01;

    &_open {
      border-color: $color-green-01;
      border-radius: 5px 5px 0 0;
    }

    &::after {
      content: '';
      position: absolute;
      top: 20px;
      right: 17px;
      border: 5px solid transparent;
      border-top-color: $color-white-01;
    }
  }

  &__list {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    height: max-content;
    color: $color-white-01;
    border-radius: 0 0 5px 5px;
    border: 1px solid $color-green-01;
    background-color: $color-grey-04;
    box-sizing: border-box;
    overflow: scroll;
    max-height: 282px;

    &_hidden {
      display: none;
    }
  }

  &__item {
    height: 47px;
    padding-left: 10px;
    color: $color-white-01;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    box-sizing: border-box;

    &:hover {
      background-color: $color-green-01;
    }
  }
}
</style>
