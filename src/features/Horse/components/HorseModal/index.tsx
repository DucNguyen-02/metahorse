import horseApi from 'apis/horseApi'
import { links } from 'apps'
import { CLOSE_BTN } from 'assets/images'
import { AbilityBox, AttributeBox, EnergyBar, QuickStatsBox } from 'features/Horse/components'
import { useToggle } from 'hooks'
import { ApiResponse, Horse } from 'models'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'shared'
import { handleAsyncRequest } from 'utils/helper'
import HorseModalStyled from './styled'

interface HorseModalProps {
  horseId: number
  onOverlayClick?: () => void
  onCloseButtonClick?: () => void
}

function HorseModal({ horseId, onOverlayClick, onCloseButtonClick }: HorseModalProps) {
  const [horse, setHorse] = useState<Horse>()
  const [isLoading, setIsLoading] = useToggle(false)

  useEffect(() => {
    const fetchHorse = async () => {
      setIsLoading(true)

      const [error, horseResponse] = await handleAsyncRequest<ApiResponse<Horse>>(
        horseApi.getHorseDetail(String(horseId))
      )

      if (error) {
        console.log(error)
      }

      if (horseResponse) {
        const fetchedHorse = horseResponse.data
        setHorse(fetchedHorse)
      }

      setIsLoading(false)
    }

    fetchHorse()
  }, [horseId])

  return (
    <Modal onOverlayClick={onOverlayClick}>
      <HorseModalStyled>
        {horse && !isLoading && (
          <Fragment>
            <button className='close-btn p-0 position-absolute' role='button' onClick={onCloseButtonClick}>
              <img src={CLOSE_BTN} alt='close' />
            </button>
            <div className='quick-view'>
              <div className='container'>
                <div className='quick-view-box position-relative'>
                  <div className='quick-view-container d-flex flex-column flex-lg-row align-items-lg-center'>
                    <div className='quick-view-left'>
                      <div className='left'>
                        <div className='name color-white font-bold text-uppercase d-block d-lg-none mb-4'>
                          {horse.name}
                        </div>
                        <div className='background-container mb-2'>
                          <div className='background d-flex align-items-center justify-content-center'>
                            <Link to={links.horse.detail(horseId)}>
                              <img src={horse.avatar} alt={horse.name} className='avatar' />
                            </Link>
                          </div>
                        </div>
                        <div className='energy-container'>
                          <EnergyBar
                            maxEnergy={horse.max_energy}
                            currentEnergy={horse.current_energy}
                            customClass='custom-energy mx-auto'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='quick-view-right'>
                      <div className='right'>
                        <div className='name color-white font-bold text-uppercase d-none d-lg-block'>{horse.name}</div>
                        <div className='attribute-container row gy-4'>
                          <div className='col-6 col-xl-4'>
                            <AttributeBox title='Bloodline' value={horse.blood_line} />
                          </div>
                          <div className='col-6 col-xl-4'>
                            <AttributeBox title='Gender' value={horse.gender} />
                          </div>
                        </div>
                        <div className='stats-container d-flex flex-wrap gap-4'>
                          {horse.list_horse_stats.map((stats, index) => (
                            <div className='d-inline-block' key={index}>
                              <QuickStatsBox statsType={stats.stats_type} statsRank={stats.stat_rank} />
                            </div>
                          ))}
                        </div>
                        <div className='ability-container row gy-4'>
                          {horse.list_horse_ability.map(skill => (
                            <div className='col-12 col-sm-6' key={skill.id}>
                              <AbilityBox name={skill.name} level={skill.level} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </HorseModalStyled>
    </Modal>
  )
}

export default HorseModal
