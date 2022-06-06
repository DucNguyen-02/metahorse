import { useCallback, useMemo, useRef, useState } from 'react'

import { useUpdateEffect } from 'hooks'
import { RankHorse, StepHorse } from 'models'
import HorseTrack from '../HorseTrack'
import HorseTrackListStyled, { HORSE_AVATAR_WIDTH, START_AREA_WIDTH } from './styled'
import { EXTRA_DISTANCE } from '../HorseTrack/styled'

interface HorseTrackListProps {
  horses: StepHorse[]
  distance: number
  sortingRankHorseList: RankHorse[]
  isRaceEnd: boolean
}

const DISTANCE_EVERY_MILESTONE = 200
const HORSE_TRACK_LIST_CLIENT_WIDTH_FALLBACK = 0

function HorseTrackList({ horses, distance, sortingRankHorseList, isRaceEnd }: HorseTrackListProps) {
  const milestoneNumber = useMemo(() => Math.floor(distance / DISTANCE_EVERY_MILESTONE), [distance])
  const horseTrackContainerRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState(0)
  const horseTrackListClientWidth = useMemo(() => {
    if (!horseTrackContainerRef.current) {
      return HORSE_TRACK_LIST_CLIENT_WIDTH_FALLBACK
    }

    return horseTrackContainerRef.current.clientWidth
  }, [horseTrackContainerRef.current, horses])

  useUpdateEffect(() => {
    const allHorsesPassCenterOfViewLine = sortingRankHorseList.every(
      horse => horse.step.d > horseTrackListClientWidth / 2
    )

    const willTrackListStopTranslating =
      translateX > distance + HORSE_AVATAR_WIDTH + START_AREA_WIDTH + EXTRA_DISTANCE - horseTrackListClientWidth

    if (!allHorsesPassCenterOfViewLine || willTrackListStopTranslating) return

    setTranslateX(sortingRankHorseList[0].step.d - horseTrackListClientWidth / 2)
  }, [sortingRankHorseList])

  useUpdateEffect(() => {
    if (isRaceEnd) return

    setTranslateX(0)
  }, [isRaceEnd])

  const generateRaceMilestone = useCallback(() => {
    const raceMilestoneList: JSX.Element[] = []

    for (let i = 0; i < milestoneNumber; i++) {
      const milestone = (
        <div className='race-milestone-block position-relative' key={DISTANCE_EVERY_MILESTONE * (i + 1)}>
          <div className='milestone-title position-absolute color-yellow font-bold d-flex flex-column align-items-center'>
            <div className='milestone'>{DISTANCE_EVERY_MILESTONE * (i + 1)}m</div>
            <div className='triangle' />
          </div>
        </div>
      )

      raceMilestoneList.push(milestone)
    }

    return raceMilestoneList
  }, [])

  const sortRankHorseList = useCallback(() => {
    const clonedSortingRankHorseList = [...sortingRankHorseList]
    clonedSortingRankHorseList.sort((firstHorse, secondHorse) => firstHorse.horseIndex - secondHorse.horseIndex)

    return clonedSortingRankHorseList
  }, [sortingRankHorseList])

  return (
    <HorseTrackListStyled distance={distance} translateX={translateX}>
      <div className='milestone-container d-flex'>{generateRaceMilestone()}</div>
      <div className='horse-track-container d-flex flex-column' ref={horseTrackContainerRef}>
        {horses.map((horse, index) => (
          <HorseTrack
            key={horse.name + index}
            horse={horse}
            distance={distance}
            gateNumber={index + 1}
            milestoneNumber={milestoneNumber}
            rankHorse={sortRankHorseList()[index]}
            trackListTranslate={translateX}
          />
        ))}
      </div>
    </HorseTrackListStyled>
  )
}

export default HorseTrackList
