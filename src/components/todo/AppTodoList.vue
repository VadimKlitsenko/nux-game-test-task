<script setup lang="ts">
import { storeToRefs } from 'pinia'

import type { Component } from 'vue'

import { useTodoStore } from '@/stores/todoStore'

import IconStar from '@/components/icons/IconStar.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconStarBordered from '@/components/icons/IconStarBordered.vue'

const todoStore = useTodoStore()
const { filteredTodos, favoriteTodoIds } = storeToRefs(todoStore)

const getStarIcon = (id: number): Component => {
  return favoriteTodoIds.value.includes(id) ? IconStar : IconStarBordered
}
</script>

<template>
  <ul class="todo-list">
    <li
      v-for="(item) in filteredTodos"
      :key="item.id"
      :class="{ 'todo-list__item_completed': item.completed }"
      class="todo-list__item"
    >
      <IconCheck v-if="item.completed" class="todo-list__check" />

      <h4 class="todo-list__title">{{ item.title }}</h4>

      <button
        class="todo-list__button"
        @click="todoStore.removeOrAddFavoriteTodo(item.id)"
      >
        <Component :is="getStarIcon(item.id)" />
      </button>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

  &__item {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 30px;
    grid-template-rows: 1fr;
    padding: 15px 30px 15px 45px;
    border-radius: 5px;
    border: 1px solid $color-grey-01;
    color: $color-grey-01;
    background-color: $color-white-01;

    &_completed {
      opacity: 0.8;
    }
  }

  &__check {
    position: absolute;
    top: calc(50% - 12.5px);
    left: 10px;
    width: 25px;
    height: 25px;

    fill: $color-green-01;
  }

  &__title {
    display: flex;
    align-items: center;
  }

  &__button {
    background-color: transparent;
    cursor: pointer;
  }
}
</style>