import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import raceApi from 'apis/raceApi'
import { HorseRankList, HorseTrackList } from 'features/Race/components'
import { useFetch, useUpdateEffect } from 'hooks'
import { Race, RankHorse, StepHorse } from 'models'
import SchedulingLiveStarInStyled from './styled'

interface SchedulingLiveStarInProps {
  detailResult?: Race
  triggerReplay: boolean
  isRaceEnd: boolean
  toggleIsRaceEnd: (value?: boolean) => void
  toggleIsRaceInProcess: (value?: boolean) => void
}

const TIME_EVERY_FRAME = 500
const STEP_EXTENT = 5

function SchedulingLiveStarIn({
  detailResult,
  triggerReplay,
  isRaceEnd,
  toggleIsRaceEnd,
  toggleIsRaceInProcess
}: SchedulingLiveStarInProps) {
  const { raceId } = useParams<string>()
  const { data: raceResult, loading: raceResultLoading } = useFetch({
    fetcher: raceApi.getRaceResult,
    params: parseInt(raceId as string)
  })
  const [horses, setHorses] = useState<StepHorse[]>([])
  const defaultSortingRankHorseList = useMemo(() => {
    const sortingRankHorseList: RankHorse[] = []

    for (let i = 0; i < horses.length; i++) {
      const rankHorse: RankHorse = { horseIndex: i, step: horses[i].steps[0], reachFinishLine: false }

      sortingRankHorseList.push(rankHorse)
    }

    return sortingRankHorseList
  }, [horses])
  const [sortingRankHorseList, setSortingRankHorseList] = useState<RankHorse[]>(defaultSortingRankHorseList)
  const stepIndex = useRef(0)
  const schedulingLiveStarInRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!raceResult) return

    const { horses } = raceResult.race_data
    setHorses(horses)
  }, [raceResult])

  useUpdateEffect(() => {
    if (isRaceEnd) return

    setSortingRankHorseList(defaultSortingRankHorseList)
  }, [isRaceEnd])

  useUpdateEffect(() => {
    setSortingRankHorseList(defaultSortingRankHorseList)
  }, [defaultSortingRankHorseList])

  useEffect(() => {
    if (!triggerReplay) return

    const intervalId = setInterval(() => {
      if (doAllHorsesReachFinishLine()) {
        toggleIsRaceEnd(true)
        toggleIsRaceInProcess(false)
        stepIndex.current = 0
        clearInterval(intervalId)

        return
      }

      const currentSortingRankHorseList = getSortingRankHorseList()

      setSortingRankHorseList(currentSortingRankHorseList)
      stepIndex.current += STEP_EXTENT
    }, TIME_EVERY_FRAME)

    return () => {
      clearInterval(intervalId)
    }
  }, [triggerReplay, horses, sortingRankHorseList])

  const updateReachFinishLineHorseList = useCallback((): RankHorse[] => {
    return sortingRankHorseList.map(horse => {
      if (!detailResult) {
        return horse
      }

      const doesHorseReachFinishLine = horse.step.d >= detailResult?.distance.distance
      const newHorse: RankHorse = { ...horse, reachFinishLine: doesHorseReachFinishLine }

      return newHorse
    })
  }, [sortingRankHorseList])

  const getCurrentStep = (horse: StepHorse) => horse.steps[stepIndex.current] ?? horse.steps[horse.steps.length - 1]

  const getSortingRankHorseList = useCallback(() => {
    const clonedSortingRankHorseList = updateReachFinishLineHorseList()

    const reachFinishLineHorseList: RankHorse[] = clonedSortingRankHorseList.filter(horse => horse.reachFinishLine)
    const notReachFinishLineHorseList: RankHorse[] = []

    for (let i = 0; i < horses.length; i++) {
      const findingHorse = reachFinishLineHorseList.find(horse => horse.horseIndex === i)

      if (findingHorse) continue

      const currentStep = getCurrentStep(horses[i])
      const rankHorse: RankHorse = { horseIndex: i, step: currentStep, reachFinishLine: false }

      notReachFinishLineHorseList.push(rankHorse)
    }

    notReachFinishLineHorseList.sort((firstHorse, secondHorse) => secondHorse.step.d - firstHorse.step.d)

    const newSortingRankHorseList: RankHorse[] = reachFinishLineHorseList.concat(notReachFinishLineHorseList)

    return newSortingRankHorseList
  }, [horses, updateReachFinishLineHorseList])

  const doAllHorsesReachFinishLine = (): boolean | undefined => {
    if (!detailResult || sortingRankHorseList.length === 0) return

    return sortingRankHorseList.every(horse => horse.reachFinishLine)
  }

  if (raceResultLoading && !raceResult) {
    return <div className='color-white mt-4'>Loading...</div>
  }

  if (!raceResultLoading && !raceResult) {
    return <div className='color-white mt-4'>There&apos;s an error, pls try again...</div>
  }

  return (
    <SchedulingLiveStarInStyled className='d-flex align-items-end' ref={schedulingLiveStarInRef}>
      <div className='horse-rank-list-container'>
        <HorseRankList horses={horses} sortingRankHorseList={sortingRankHorseList} />
      </div>
      <div className='horse-track-list-container flex-grow-1'>
        {detailResult && (
          <HorseTrackList
            horses={horses}
            distance={detailResult.distance.distance}
            sortingRankHorseList={sortingRankHorseList}
            isRaceEnd={isRaceEnd}
          />
        )}
      </div>
    </SchedulingLiveStarInStyled>
  )
}

export default SchedulingLiveStarIn
