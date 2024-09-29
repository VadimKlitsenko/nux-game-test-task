import type { HttpResponse } from '@/types/http'
import type { StatusValues } from '@/consts/todo'

export interface Todo {
  id: number
  title: string
  userId: number
  completed: boolean
}

export interface TodoFilters {
  search: string
  id: number | null
  status: StatusValues
}

export interface CreateTodoInputs {
  title: string,
  userId: string
}

export interface CreateTodoParams {
  title: string
  userId: string
}

export type CreatedTodoData = Omit<Todo, 'completed'>

export interface TodosResponse extends HttpResponse {
  data: Todo[]
}

export interface CreateTodoResponse extends HttpResponse {
  data: CreatedTodoData
}