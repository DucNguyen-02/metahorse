/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
  data: T
  code: number
  message?: string
}

export interface Pagination {
  limit: number
  page: number
  total: number
  total_page: number
  [key: string]: any
}
