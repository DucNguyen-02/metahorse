import { useCallback, useEffect, useState } from 'react'

import { RankHorse, StepHorse } from 'models'
import HorseTrackStyled, { HorseAvatarStyled, TrackListTransLate } from './styled'

interface HorseTrackProps {
  horse: StepHorse
  distance: number
  gateNumber: number
  milestoneNumber: number
  rankHorse: RankHorse
  trackListTranslate: number
}

function HorseTrack({ horse, distance, gateNumber, milestoneNumber, rankHorse, trackListTranslate }: HorseTrackProps) {
  const [distanceHorseMoved, setDistanceHorseMoved] = useState<number>(0)

  const generateMilestones = useCallback(() => {
    const milestoneList: JSX.Element[] = []

    for (let i = 0; i < milestoneNumber; i++) {
      const milestone = <div className='milestone-block' key={i} />

      milestoneList.push(milestone)
    }

    return milestoneList
  }, [distance])

  useEffect(() => {
    if (!rankHorse) return
    setDistanceHorseMoved(rankHorse.step.d)
  }, [rankHorse])

  return (
    <HorseTrackStyled distance={distance}>
      <div className='horse-track d-flex align-items-center position-relative'>
        <TrackListTransLate trackListTranslate={trackListTranslate}>
          <div className='gate-container d-flex align-items-center justify-content-center'>
            <div className='gate-number font-bold color-white'>{gateNumber}</div>
          </div>
        </TrackListTransLate>
        <div className='milestone-list-container position-absolute w-100 d-flex'>{generateMilestones()}</div>
        <HorseAvatarStyled
          src={horse.avatar}
          alt={horse.name}
          className='position-absolute'
          distanceHorseMoved={distanceHorseMoved}
        />
      </div>
    </HorseTrackStyled>
  )
}

export default HorseTrack
