<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { STATUSES } from '@/consts/todo'
import { useTodoStore } from '@/stores/todoStore'

import UiInput from '@/components/ui/UiInput.vue'
import UiSelect from '@/components/ui/UiSelect.vue'

const { filters, userIdsAsOptions } = storeToRefs(useTodoStore())
</script>

<template>
  <form
    class="todo-filters"
    @submit.prevent
  >
    <UiSelect
      v-model="filters.status"
      :options="STATUSES"
      placeholder="Status"
    />

    <UiSelect
      v-model="filters.id"
      :options="userIdsAsOptions"
      placeholder="ID"
    />

    <UiInput v-model="filters.search" placeholder="Search" />
  </form>
</template>

<style scoped lang="scss">
.todo-filters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 20px;
  margin-top: 20px;
}
</style>