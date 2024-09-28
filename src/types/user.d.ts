import type { HttpResponse } from '@/types/http'

export interface UserGeo {
  lat: string
  lng: string
}

export interface UserAddress {
  city: string
  suite: string
  street: string
  zipcode: string
  geo: UserGeo
}

export interface UserCompany {
  bs: string
  name: string
  catchPhrase: string
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  username: string
  company: UserCompany
  address: UserAddress
}

export interface UserLoginParams {
  name: string
  phone: string
}

export interface UsersResponse extends HttpResponse {
  data: User[]
}