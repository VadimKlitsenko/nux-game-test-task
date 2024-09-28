<script setup lang="ts">
defineProps<{
  items: Record<string, string | number>
}>()
</script>

<template>
  <article class="ui-named-list">
    <h4 class="ui-named-list__title">
      <slot />
    </h4>
    <ul class="ui-named-list__list">
      <li
        v-for="(val, key) in items"
        :key="key"
        class="ui-named-list__item"
      >
        {{ key }}: <b>{{ val }}</b>
      </li>
    </ul>
  </article>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.ui-named-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 5px;
  padding: 15px;
  background-color: $color-white-01;

  &__title {
    color: $color-grey-01;
    font-size: 22px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  &__item {
    color: $color-grey-02;

    b {
      color: $color-grey-01;
    }
  }
}
</style>