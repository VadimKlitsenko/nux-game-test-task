import type { HttpResponse } from '@/types/http'

const getQueryStr = (
  baseUrl: string,
  params: Record<string, string> = {}
): string => {
  const url = new URL(baseUrl)
  const searchParams = new URLSearchParams(params)

  url.search = searchParams.toString()

  return url.toString()
}

export const httpGet = async <R extends HttpResponse>(
  url: string,
  params: Record<string, string> = {}
): Promise<R> => {
  const queryStr = getQueryStr(url, params)

  const response: Response = await fetch(queryStr, {
    method: 'GET'
  })

  if (!response.ok) {
    return {
      data: null,
      error: true
    } as R
  }

  const data = await response.json() ?? null

  return {
    data,
    error: false
  } as R
}

export const httpPost = async <R extends HttpResponse>(
  url: string,
  params: Record<string, any> = {}
): Promise<R> => {
  const response: Response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    //headers: { 'Content-type': 'application/json; charset=UTF-8' }
  })

  if (!response.ok) {
    return {
      data: null,
      error: true
    } as R
  }

  const data = await response.json() ?? null

  return {
    data,
    error: false
  } as R
}