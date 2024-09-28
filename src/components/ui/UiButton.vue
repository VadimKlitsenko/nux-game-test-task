<template>
  <button class="ui-button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.ui-button {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: $color-green-01;
  font-size: 17px;
  font-weight: 600;
  color: $color-white-01;
  transition: background-color 0.1s;

  &[disabled] {
    background-color: $color-grey-03;
    cursor: default;
  }
}
</style>