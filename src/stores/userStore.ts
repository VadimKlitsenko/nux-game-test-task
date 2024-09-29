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
      suite: userInfo.value.address.suite,
      lat: userInfo.value.address.geo.lat,
      lng: userInfo.value.address.geo.lng,
      street: userInfo.value.address.street,
      zipcode: userInfo.value.address.zipcode,
    } : null
  })

  const userDetailsInfo = computed<Record<string, string | number> | null>(() => {
    return (userInfo.value) ? {
      id: userInfo.value.id,
      name: userInfo.value.name,
      phone: userInfo.value.phone,
      website: userInfo.value.website,
      userName: userInfo.value.username
    } : null
  })

  const userCompanyInfo = computed<Record<string, string | number> | null>(() => {
    return (userInfo.value) ? {
      bs: userInfo.value.company.bs,
      name: userInfo.value.company.name,
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