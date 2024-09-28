export const setToLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = <T>(key: string): T | null => {
  const value: string | null = localStorage.getItem(key)
  return value ? JSON.parse(value) as T : null
}