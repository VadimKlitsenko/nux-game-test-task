<script setup lang="ts">
import { reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'

import type { CreateTodoInputs } from '@/types/todo'

import { useTodoStore } from '@/stores/todoStore'

import UiInput from '@/components/ui/UiInput.vue'
import UiButton from '@/components/ui/UiButton.vue'

const todoStore = useTodoStore()
const { isCreationTodoLoading } = storeToRefs(todoStore)

const params = reactive<CreateTodoInputs>({
  title: '',
  userId: ''
})

const isEnableToSubmit = computed<boolean>(() => {
  return !!params.title.length && !!params.userId.length
})

const submit = (): void => {
  if (!isEnableToSubmit.value) return

  todoStore.addTodo({
    title: params.title,
    userId: Number(params.userId)
  })
}
</script>

<template>
  <form
    class="todo-form"
    @submit.prevent="submit"
  >
    <UiInput
      v-model="params.title"
      :disabled="isCreationTodoLoading"
      placeholder="Title"
    />

    <UiInput
      v-model="params.userId"
      :disabled="isCreationTodoLoading"
      placeholder="User ID"
    />

    <UiButton
      :disabled="isCreationTodoLoading"
      type="submit"
    >
      Create todo
    </UiButton>
  </form>
</template>

<style scoped lang="scss">
.todo-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 20px;
}
</style>