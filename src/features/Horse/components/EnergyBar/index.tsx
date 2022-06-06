import { useMemo } from 'react'

import { FLASH_ICON } from 'assets/images'
import { getCurrentEnergyPercent } from 'utils/helper'
import EnergyBarStyled from './styled'

interface EnergyBarProps {
  maxEnergy: number | null
  currentEnergy: number | null
  customClass?: string
}

function EnergyBar({ maxEnergy, currentEnergy, customClass = '' }: EnergyBarProps) {
  const currentEnergyPercent = useMemo<number>(
    () => getCurrentEnergyPercent(currentEnergy, maxEnergy),
    [currentEnergy, maxEnergy]
  )

  return (
    <EnergyBarStyled currentEnergyPercent={currentEnergyPercent} className={customClass}>
      <div className='energy-bar d-flex'>
        <img src={FLASH_ICON} alt='' className='energy-icon position-relative' />
        <div className='energy-content d-flex flex-grow-1 flex-column'>
          <span className='energy-text color-grey'>Energy</span>
          <div className='bar flex-grow-1 position-relative' />
          <span className='energy-text color-grey'>
            Recovery: <span className='energy-time color-white'>12:12:12</span>
          </span>
        </div>
      </div>
    </EnergyBarStyled>
  )
}

export default EnergyBar
