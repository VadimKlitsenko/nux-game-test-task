import type { UsersResponse } from '@/types/user'

import { httpGet } from '@/services/http.service'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchUsers = async (): Promise<UsersResponse> => {
  return httpGet<UsersResponse>(USERS_URL)
}