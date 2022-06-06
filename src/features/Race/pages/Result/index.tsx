import { useEffect, useLayoutEffect, useMemo, useState } from 'react'

import raceApi from 'apis/raceApi'
import { FILTER_ICON } from 'assets/images'
import { RaceTable, SwitchBtn } from 'features/Race/components'
import { useAppSelector, useToggle, useUpdateEffect } from 'hooks'
import { GetRaceListParams, RaceStatus, RecordRace } from 'models'
import { OneLineTitle } from 'shared'
import { resultListColumns } from 'utils/columns'
import { handleAsyncRequest } from 'utils/helper'
import ResultStyled from './styled'

const defaultParams: GetRaceListParams = {
  limit: 10,
  page: 1,
  status: RaceStatus.RESULT,
  freeRace: false,
  myHorse: false
}

function Result() {
  const [params, setParams] = useState<GetRaceListParams>(defaultParams)
  const [isMyHorseOn, toggleIsMyHorseOn] = useToggle(false)
  const [races, setRaces] = useState<RecordRace[]>([])
  const [loader, setLoader] = useState(true)
  const auth = useAppSelector(state => state.auth)

  const memoizedResultListColumns = useMemo(() => resultListColumns, [])

  useLayoutEffect(() => {
    const handleLoadingRaces = () => {
      if (races.length < 10 && races.length > 0) {
        setLoader(true)
      }
    }

    handleLoadingRaces()
  })

  const fetchListRaces = async () => {
    const [, result] = await handleAsyncRequest(raceApi.getRaceList(params))
    const records = result?.data.records
    if (records && records.length > 0) {
      setRaces([...races, ...records])
      setLoader(false)
    }

    if (records && records.length === 0) {
      setLoader(true)
    }
  }

  useEffect(() => {
    fetchListRaces()
  }, [params])

  useUpdateEffect(() => {
    setRaces([])
    setParams({ ...params, myHorse: isMyHorseOn, page: 1 })
  }, [isMyHorseOn])

  return (
    <ResultStyled>
      <div className='head-container'>
        <OneLineTitle text='results' customClass='title' />
      </div>
      {auth.isLogged ? (
        <div className='search-container d-flex align-items-cente'>
          <div className='filter-container d-flex align-items-center justify-content-center'>
            <div className='filter d-flex align-items-center justify-content-center'>
              <img src={FILTER_ICON} alt='' className='filter-icon' />
              <span className='filter-text color-grey'>Filter</span>
            </div>
          </div>
          <SwitchBtn title='My horse only' isOn={isMyHorseOn} handleSwitchBtnClicked={toggleIsMyHorseOn} />
        </div>
      ) : null}
      <div className='content-container pt-0'>
        <RaceTable
          columns={memoizedResultListColumns}
          data={races ?? []}
          isRowClickable
          raisePage={setParams}
          loader={loader}
          params={params}
        />
      </div>
    </ResultStyled>
  )
}

export default Result
