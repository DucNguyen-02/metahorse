import { SyntheticEvent, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { links } from 'apps'
import { FLASH_ICON } from 'assets/images'
import { Horse } from 'models'
import { ClassTag } from 'shared'
import { capitalizeOnlyFirstLetter, getCurrentEnergyPercent } from 'utils/helper'
import ChooseHorseItemStyled from './styled'

interface ChooseHorseItemProps {
  horse: Horse
  onHorseClick: (horseId: number) => void
  customClass?: string
}

function ChooseHorseItem({ horse, onHorseClick, customClass = '' }: ChooseHorseItemProps) {
  const currentEnergyPercent = useMemo<number>(
    () => getCurrentEnergyPercent(horse.current_energy, horse.max_energy),
    [horse]
  )
  const bloodLine = useMemo<string>(() => capitalizeOnlyFirstLetter(horse.blood_line), [horse])
  const gender = useMemo<string>(() => capitalizeOnlyFirstLetter(horse.gender), [horse])
  const lastFiveRaces = useMemo<string>(() => horse.last_races_position.join('-'), [horse])

  const handleItemClick = (horseId: number) => () => {
    onHorseClick(horseId)
  }

  const handleDetailContainerClick = (e: SyntheticEvent) => {
    e.stopPropagation()
  }

  return (
    <ChooseHorseItemStyled currentEnergy={currentEnergyPercent} className={customClass}>
      <div
        className='choose-horse-item d-flex align-items-center justify-content-between'
        role='button'
        onClick={handleItemClick(horse.id)}
      >
        <div className='left-container d-flex flex-column align-items-center'>
          <div className='avatar-container d-flex align-items-center justify-content-center p-1'>
            <img src={horse.avatar} alt={horse.name} className='avatar' />
          </div>
          <div className='energy-container d-flex align-items-center'>
            <img src={FLASH_ICON} alt='energy' className='energy-icon' />
            <div className='energy-bar position-relative' />
          </div>
          <div className='link-container'>
            <Link to={links.horse.detail(horse.id)} className='link color-primary' onClick={handleDetailContainerClick}>
              Detail
            </Link>
          </div>
        </div>
        <div className='mid-container flex-grow-1 ps-5'>
          <div className='horse-container'>
            <div className='name color-white font-bold text-uppercase'>{horse.name}</div>
            <div className='bloodline-gender color-white'>
              {bloodLine} - {gender}
            </div>
            <div className='class-type'>
              <ClassTag text={horse.racing_class} isActive={true} />
            </div>
            <div className='extra-info d-flex align-items-center'>
              <span className='title color-grey'>Career</span>
              <span className='content color-white'>
                {horse.career.total_number_of_races}{' '}
                <span>
                  {horse.career.first_count}/{horse.career.second_count}/{horse.career.third_count}
                </span>
              </span>
            </div>
            <div className='extra-info d-flex align-items-center'>
              <span className='title color-grey'>Last 5 race</span>
              <span className='content color-white'>{lastFiveRaces}</span>
            </div>
          </div>
        </div>
        <div className='right-container'>
          <div className='stat-container-border'>
            <div className='stat-container d-flex flex-wrap'>
              {horse.list_horse_stats.map(stats => (
                <div key={stats.stats_type} className='stat-item w-50 d-flex align-items-center'>
                  <span className='stat-title color-yellow'>{stats.stats_type}</span>
                  <span className='stat-content color-white'>{stats.stat_rank || 'A'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ChooseHorseItemStyled>
  )
}

export default ChooseHorseItem
