import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

import type { User, UserLoginParams } from '@/types/user'

import { fetchUsers } from '@/services/user.service'
import { LocalStorageKeys } from '@/consts/local-storage'
import { getFromLocalStorage, setToLocalStorage } from '@/services/local-storage.service'

export const useUserStore = defineStore('userStore', () => {
  const _users = ref<User[]>([])
  const _areUsersLoading = ref<boolean>(false)
  const _userInfo = ref<User | null>(getFromLocalStorage<User>(LocalStorageKeys.USER))

  const userFilters = reactive<UserLoginParams>({
    name: '',
    phone: ''
  })

  const userInfo = computed<User | null>(() => _userInfo.value)

  const areUsersLoading = computed<boolean>(() => _areUsersLoading.value)

  const userAddress = computed<Record<string, string | number> | null>(() => {
    return (userInfo.value) ? {
      city: userInfo.value.address.city,
      street: userInfo.value.address.street,
      suite: userInfo.value.address.suite,
      zipcode: userInfo.value.address.zipcode,
      lat: userInfo.value.address.geo.lat,
      lng: userInfo.value.address.geo.lng,
    } : null
  })

  const userDetailsInfo = computed<Record<string, string | number> | null>(() => {
    return (userInfo.value) ? {
      id: userInfo.value.id,
      name: userInfo.value.name,
      userName: userInfo.value.username,
      phone: userInfo.value.phone,
      website: userInfo.value.website
    } : null
  })

  const userCompanyInfo = computed<Record<string, string | number> | null>(() => {
    return (userInfo.value) ? {
      name: userInfo.value.company.name,
      bs: userInfo.value.company.bs,
      catchPhrase: userInfo.value.company.catchPhrase
    } : null
  })

  const setUserInfo = (): void => {
    _userInfo.value = _users.value.find(({ username, phone }: User) => {
      return username === userFilters.name && phone === userFilters.phone
    }) ?? null

    setToLocalStorage<User | null>(LocalStorageKeys.USER, _userInfo.value)
  }

  const clearUserFilters = (): void => {
    userFilters.name = userFilters.phone = ''
  }

  const login = async (): Promise<boolean> => {
    _areUsersLoading.value = true

    const { data, error } = await fetchUsers()

    _areUsersLoading.value = false

    if (!error) {
      _users.value = data
      setUserInfo()
    }

    return userInfo.value !== null
  }

  return {
    userInfo,
    userFilters,
    userAddress,
    userDetailsInfo,
    areUsersLoading,
    userCompanyInfo,
    login,
    clearUserFilters
  }
})