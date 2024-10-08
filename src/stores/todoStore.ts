import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

import type { SelectOption } from '@/types/ui'
import type {
  Todo,
  TodoFilters,
  CreatedTodoData,
  CreateTodoParams
} from '@/types/todo'

import { StatusValues } from '@/consts/todo'
import { DEFAULT_SELECT_OPTION } from '@/consts/ui'
import { LocalStorageKeys } from '@/consts/local-storage'
import { createTodo, fetchTodos } from '@/services/todo.service'
import { getFromLocalStorage, setToLocalStorage } from '@/services/local-storage.service'

export const useTodoStore = defineStore('todoStore', () => {
  const _todos = ref<Todo[]>([])
  const _areTodosLoading = ref<boolean>(false)
  const _isCreationTodoLoading = ref<boolean>(false)
  const _favoriteTodoIds = ref<number[]>(
    getFromLocalStorage<number[]>(LocalStorageKeys.FAVOURITE_TODO_IDS) || []
  )

  const filters = reactive<TodoFilters>({
    id: null,
    search: '',
    status: StatusValues.ALL
  })

  const areTodosLoading = computed<boolean>(() => _areTodosLoading.value)

  const favoriteTodoIds = computed<number[]>(() => _favoriteTodoIds.value)

  const isCreationTodoLoading = computed<boolean>(() => _isCreationTodoLoading.value)

  const userIdsAsOptions = computed<SelectOption[]>(() => {
    const nonUniqUserIds = _todos.value.map(({ userId }: Todo): number => userId)

    const userOptions = [...(new Set(nonUniqUserIds))]
      .map((id: number): SelectOption => {
        return {
          value: id,
          label: id.toString()
        }
      })

    return [
      DEFAULT_SELECT_OPTION,
      ...userOptions
    ]
  })

  const filteredTodos = computed<Todo[]>(() => {
    return _todos.value.filter((todo: Todo) => {
      const isValidId = (filters.id === null) || todo.id === filters.id
      const isSearchMatch = filters.search.length === 0 || todo.title.includes(filters.search)

      let isValidStatus = true

      if (filters.status !== StatusValues.ALL) {
        switch(filters.status) {
          case StatusValues.COMPLETED: {
            isValidStatus = todo.completed
            break
          }
          case StatusValues.UNCOMPLETED: {
            isValidStatus = !todo.completed
            break
          }
          case StatusValues.FAVORITE: {
            isValidStatus = _favoriteTodoIds.value.includes(todo.id)
            break
          }
        }
      }

      return isValidId && isSearchMatch && isValidStatus
    })
  })

  const addTodoToList = (todo: CreatedTodoData): void => {
    _todos.value.unshift({
      ...todo,
      completed: false
    })
  }

  const removeOrAddFavoriteTodo = (todoId: number): void => {
    if (_favoriteTodoIds.value.includes(todoId)) {
      _favoriteTodoIds.value = _favoriteTodoIds.value.filter(i => i !== todoId)
    } else {
      _favoriteTodoIds.value.push(todoId)
    }

    setToLocalStorage(LocalStorageKeys.FAVOURITE_TODO_IDS, _favoriteTodoIds.value)
  }

  const addTodo = async (params: CreateTodoParams): Promise<void> => {
    _isCreationTodoLoading.value = true

    const { data, error } = await createTodo(params)

    _isCreationTodoLoading.value = false

    if (!error) {
      addTodoToList(data)
    }
  }

  const getTodos = async (): Promise<void> => {
    _areTodosLoading.value = true

    const { data, error } = await fetchTodos()

    _areTodosLoading.value = false

    if (!error) {
      _todos.value = data
    }
  }

  return {
    filters,
    filteredTodos,
    areTodosLoading,
    favoriteTodoIds,
    userIdsAsOptions,
    isCreationTodoLoading,
    addTodo,
    getTodos,
    removeOrAddFavoriteTodo
  }
})