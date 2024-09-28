<script lang="ts" setup>
import AppUserInfo from '@/components/AppUserInfo.vue'
import AppTodoForm from '@/components/AppTodoForm.vue'
import AppTodoFilters from '@/components/AppTodoFilters.vue'
</script>

<template>
  <section class="index">
    <AppUserInfo />

    <AppTodoFilters class="index__form" />

    <AppTodoForm class="index__form" />
  </section>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables";

.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  height: 100%;
  padding: 30px 20px;
  background-color: $color-grey-03;

  &__form {
    width: min(1000px, 100%);
  }
}
</style>