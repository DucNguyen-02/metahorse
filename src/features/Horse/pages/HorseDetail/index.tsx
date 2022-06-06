import horseApi from 'apis/horseApi'
import { AbilityBox, AttributeBox, EnergyBar, HorseCareerItem, StatsBar } from 'features/Horse/components'
import { useFetch } from 'hooks'
import { GetHorseCareerListParams, GetHorseCareerResponse, Horse, HorseCareer } from 'models'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OneLineTitle } from 'shared'
import { capitalizeOnlyFirstLetter } from 'utils/helper'
import HorseDetailStyled from './styled'

const careerListParams: Omit<GetHorseCareerListParams, 'horseId'> = {
  limit: 8,
  page: 1
}

function HorseDetail() {
  const { horseId } = useParams<string>()
  const [horseCareerList, setHorseCareerList] = useState<HorseCareer[]>([])
  const { data: horse } = useFetch<Horse, string>({ fetcher: horseApi.getHorseDetail, params: horseId })
  const { data: horseCareerListResponse } = useFetch<GetHorseCareerResponse, GetHorseCareerListParams>({
    fetcher: horseApi.getHorseCarrerList,
    params: { ...careerListParams, horseId: horseId as string }
  })

  useEffect(() => {
    if (!horseCareerListResponse?.records) return

    setHorseCareerList(horseCareerListResponse.records)
  }, [horseCareerListResponse])

  return (
    <HorseDetailStyled>
      <div className='horse-detail'>
        <div className='container'>
          <div className='horse-detail-box position-relative'>
            <div className='horse-detail-container d-flex flex-column flex-lg-row'>
              <div className='horse-detail-left'>
                <div className='left'>
                  <div className='name color-white font-bold text-uppercase d-block d-lg-none mb-4'>{horse?.name}</div>
                  <div className='background-container mb-4'>
                    <div className='background d-flex align-items-center justify-content-center'>
                      <img src={horse?.avatar} alt={horse?.name} className='avatar' />
                    </div>
                  </div>
                  <div className='energy-container d-flex justify-content-center'>
                    <EnergyBar
                      maxEnergy={horse?.max_energy || 100}
                      currentEnergy={horse?.current_energy || 0}
                      customClass='w-75'
                    />
                  </div>
                </div>
              </div>
              <div className='horse-detail-right flex-grow-1'>
                <div className='right'>
                  <div className='name color-white font-bold text-uppercase d-none d-lg-block'>{horse?.name}</div>
                  <div className='attribute-container row gy-4'>
                    <div className='col-6 col-xl-4'>
                      <AttributeBox title='Bloodline' value={capitalizeOnlyFirstLetter(horse?.blood_line ?? 'none')} />
                    </div>
                    <div className='col-6 col-xl-4'>
                      <AttributeBox title='Gender' value={capitalizeOnlyFirstLetter(horse?.gender ?? '')} />
                    </div>
                  </div>
                  <div className='ability-container row gy-4'>
                    {horse?.list_horse_ability.map(skill => (
                      <div className='col-12 col-sm-6' key={skill.id}>
                        <AbilityBox name={skill.name} level={skill.level} />
                      </div>
                    ))}
                  </div>
                  <div className='level-stats-container d-flex'>
                    <div className='level-container'>
                      <div className='level-bg d-flex align-items-center justify-content-center position-relative'>
                        <div className='level font-bold color-white'>{horse?.level.level}</div>
                        <div className='level-text color-yellow font-bold position-absolute'>Lv.</div>
                      </div>
                    </div>
                    <div className='stats-container d-flex flex-column flex-grow-1'>
                      {horse?.list_horse_stats.map(stats => (
                        <StatsBar
                          key={stats.stats_type}
                          statsType={stats.stats_type}
                          statsRank={stats.stat_rank}
                          currentValue={stats.current_value}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='horse-career-container'>
            <div className='horse-career-title'>
              <OneLineTitle text='career' customClass='title' />
            </div>
            <div className='horse-career-total color-white d-flex align-items-center'>
              <div className='total-container'>
                <span className='title'>Race total: </span>
                <span className='total'>{horseCareerList.length}</span>
              </div>
              <span className='statistic'>none</span>
            </div>
            <div className='horse-career'>
              <table className='horse-career-table w-100'>
                <tbody>
                  {horseCareerList.map(career => (
                    <HorseCareerItem key={career.race_horses_id} career={career} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </HorseDetailStyled>
  )
}

export default HorseDetail
