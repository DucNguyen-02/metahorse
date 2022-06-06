import { Pagination } from './common'
import { Horse } from './horse'

export interface CurrentUser {
  avatar?: string
  description?: string
  email?: string
  lose_count: number
  name: string
  public_address: string
  total_race: number
  win_count: number
  win_rate: number
}

export interface MyHorseListParams {
  limit: number
  page: number
  name?: string
  raceClass?: string
}

export interface GetMyHorseListResponse extends Pagination {
  records: Horse[]
}
