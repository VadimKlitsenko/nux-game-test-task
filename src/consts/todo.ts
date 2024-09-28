import type { SelectOption } from '@/types/ui'

export enum StatusValues {
  ALL = "",
  COMPLETED = 0,
  UNCOMPLETED = 1,
  FAVORITE = 2
}

export const STATUSES: SelectOption[] = [
  {
    value: StatusValues.ALL,
    label: 'All'
  },
  {
    value: StatusValues.COMPLETED,
    label: 'Completed'
  },
  {
    value: StatusValues.UNCOMPLETED,
    label: 'Uncompleted'
  },
  {
    value: StatusValues.FAVORITE,
    label: 'Favorite'
  }
]