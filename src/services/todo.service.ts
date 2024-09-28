import type {
  TodosResponse,
  CreateTodoParams,
  CreateTodoResponse
} from '@/types/todo'

import { httpGet, httpPost } from '@/services/http.service'

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

export const fetchTodos = async (): Promise<TodosResponse> => {
  return httpGet(TODOS_URL)
}

export const createTodo = async (params: CreateTodoParams): Promise<CreateTodoResponse> => {
  return httpPost(TODOS_URL, params)
}