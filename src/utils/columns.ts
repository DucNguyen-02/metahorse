/* eslint-disable @typescript-eslint/no-explicit-any */
interface Column {
  Header: string
  accessor: any
}

interface Accessor {
  count_down: string
  raceName: string
  raceCourse: string
  grade: string
  field: string
  distance: string
  entryFee: string
  totalPrize: string
  registered: string
  startIn: string
  gate: string
  horse: string
  bloodLine: string
  statistic: string
  ownerName: string
  endAt: string
  racePosition: string
  racePrize: string
}

export const accessor: Accessor = {
  count_down: 'count_down',
  raceName: 'name',
  raceCourse: 'course.city',
  grade: 'racing_class_name',
  field: 'field_type',
  distance: 'distance',
  entryFee: 'entry_fee',
  totalPrize: 'total_prize',
  registered: 'registered',
  startIn: 'start_at',
  gate: 'gate',
  horse: 'horse',
  bloodLine: 'blood_line',
  statistic: 'statistic',
  ownerName: 'owner_name',
  endAt: 'end_at',
  racePosition: 'race_position',
  racePrize: 'race_prize'
}

const gateColumn: Column = {
  Header: 'gate no.',
  accessor: accessor.gate
}

const horseColumn: Column = {
  Header: 'horse',
  accessor: accessor.horse
}

const horseInfoColumn: Column = {
  Header: 'horse info',
  accessor: accessor.bloodLine
}

const statisticColumn: Column = {
  Header: 'race statistic',
  accessor: accessor.statistic
}

const ownerNameColumn: Column = {
  Header: 'owner name',
  accessor: accessor.ownerName
}

const rankColumn: Column = {
  Header: 'rank',
  accessor: accessor.racePosition
}

const totalPrizeColumn: Column = {
  Header: 'prize',
  accessor: accessor.totalPrize
}
const racePrizeColumn: Column = {
  Header: 'prize',
  accessor: accessor.racePrize
}

const raceNameColumn: Column = {
  Header: 'race name',
  accessor: accessor.raceName
}

const raceCourseColumn: Column = {
  Header: 'racecourse',
  accessor: accessor.raceCourse
}

const gradeCourseColumn: Column = {
  Header: 'grade',
  accessor: accessor.grade
}

const fieldTypeColumn: Column = {
  Header: 'field type',
  accessor: accessor.field
}

const distanceColumn: Column = {
  Header: 'distance',
  accessor: accessor.distance
}

const entryFeeColumn: Column = {
  Header: 'entry fee',
  accessor: accessor.entryFee
}

const registeredColumn: Column = {
  Header: 'registered',
  accessor: accessor.registered
}

const endAtColumn: Column = {
  Header: 'date',
  accessor: accessor.endAt
}

const startsInColumn: Column = {
  Header: 'starts in',
  accessor: accessor.count_down
}

export const openAndSchedulingDetailColumns: Column[] = [
  gateColumn,
  horseColumn,
  horseInfoColumn,
  statisticColumn,
  ownerNameColumn
]

export const resultDetailColumns: Column[] = [
  rankColumn,
  gateColumn,
  horseColumn,
  horseInfoColumn,
  racePrizeColumn,
  ownerNameColumn
]

export const openListColumns: Column[] = [
  raceNameColumn,
  raceCourseColumn,
  gradeCourseColumn,
  fieldTypeColumn,
  distanceColumn,
  entryFeeColumn,
  totalPrizeColumn,
  registeredColumn
]

export const resultListColumns: Column[] = [
  raceNameColumn,
  raceCourseColumn,
  gradeCourseColumn,
  fieldTypeColumn,
  distanceColumn,
  entryFeeColumn,
  totalPrizeColumn,
  endAtColumn
]

export const schedulingListColumns: Column[] = [
  raceNameColumn,
  raceCourseColumn,
  gradeCourseColumn,
  fieldTypeColumn,
  distanceColumn,
  totalPrizeColumn,
  startsInColumn
]
