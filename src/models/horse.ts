import { Pagination } from './common'

interface Career {
  first_count: number
  lose_count: number
  second_count: number
  third_count: number
  total_number_of_races: number
  win_count: number
}

interface Level {
  ability_point: number
  exp_to_level_up: number
  id: number
  level: number
  total_ability_point: number
  total_exp: number
}

export interface Horse {
  animation: string
  avatar: string
  blood_line: string
  current_energy: number | null
  career: Career
  experience: string
  gender: string
  id: number
  last_races_position: number[]
  level: Level
  list_horse_ability: {
    abilities_code: string
    description: string
    id: number
    level: number
    name: string
    parameters: string
  }[]
  list_horse_skill: {
    description: string
    id: number
    name: string
    parameters: string
    skill_code: string
  }[]
  list_horse_stats: {
    current_value: number
    init_value: number
    stat_rank: string
    stats_type: string
  }[]
  max_energy: number | null
  model: string
  name: string
  racing_class: string
  racing_point: number
  run_type: string
  sound: string
  sub_avavatar: string
  token_id: number
}

export interface HorseCareer {
  city: string
  country: string
  distance: number
  entry_fee: number
  field_type: string
  prize: number
  race_date: string
  race_horses_id: number
  race_name: string
  race_position: number
  racing_class: string
  total_prize: number
}

export interface GetHorseCareerResponse extends Pagination {
  records: HorseCareer[]
}

export interface GetHorseCareerListParams {
  horseId: string
  limit?: number
  page?: number
}

export interface HorseInGate {
  avatar: string
  bloodline: {
    code: string
    color: string
    color_code: string
    id: number
    name: string
    type: string
  }
  career: Career
  current_energy: number
  experience: number
  gender: string
  id: number
  max_energy: number
  name: string
  racing_point: number
  sub_avatar: string
  token_id: number
  user: {
    id: number
    name: string
  }
}

export interface TopHorse {
  first_count: number
  horse_avatar: string
  horse_name: string
  id: number
  owner: string
  racing_point: number
  second_count: number
  third_count: number
}

export interface TopStable {
  first_count: number
  owner_avatar: string | null
  owner_id: number
  owner_name: string
  second_count: number
  third_count: number
  total_racing_point: number
}

export interface GetTopParams {
  limit?: number
  yearMonth?: string
}
