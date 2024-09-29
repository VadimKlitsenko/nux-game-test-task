<script lang="ts" setup>
import { useTodoStore } from '@/stores/todoStore'

import AppUserInfo from '@/components/AppUserInfo.vue'
import AppTodoForm from '@/components/todo/AppTodoForm.vue'
import AppTodoList from '@/components/todo/AppTodoList.vue'
import AppTodoFilters from '@/components/todo/AppTodoFilters.vue'

const todoStore = useTodoStore()

todoStore.getTodos()
</script>

<template>
  <section class="index">
    <AppUserInfo />

    <AppTodoFilters class="index__form" />

    <AppTodoForm class="index__form" />

    <AppTodoList />
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

@media screen and (max-width: 767px) {
  .index {
    gap: 50px;
  }
}
</style>