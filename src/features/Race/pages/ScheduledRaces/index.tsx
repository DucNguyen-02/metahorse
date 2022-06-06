import raceApi from 'apis/raceApi'
import { RaceTable, SwitchBtn } from 'features/Race/components'
import { useAppSelector, useDebounce, useToggle, useUpdateEffect } from 'hooks'
import { GetRaceListParams, RaceStatus, RecordRace } from 'models'
import { ChangeEvent, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { OneLineTitle, SearchInput } from 'shared'
import { handleAsyncRequest } from 'utils/helper'
import ScheduledRacesStyled from './styled'
import { schedulingListColumns } from 'utils/columns'

const defaultParams: GetRaceListParams = {
  limit: 10,
  page: 1,
  status: RaceStatus.SCHEDULING,
  freeRace: false,
  myHorse: false,
  search: ''
}

function ScheduledRaces() {
  const [params, setParams] = useState<GetRaceListParams>(defaultParams)
  const [searchValue, setSearchValue] = useState<string>('')
  const [isMyHorseOn, toggleIsMyHorseOn] = useToggle(false)
  const debounceSearchValue = useDebounce<string>(searchValue, 500)
  const [races, setRaces] = useState<RecordRace[]>([])
  const [loader, setLoader] = useState(true)
  const auth = useAppSelector(state => state.auth)

  const memoizedSchedulingListColumns = useMemo(() => schedulingListColumns, [])

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
    setParams({ ...params, search: debounceSearchValue, page: 1 })
  }, [debounceSearchValue])

  useUpdateEffect(() => {
    setRaces([])
    setParams({ ...params, myHorse: isMyHorseOn, page: 1 })
  }, [isMyHorseOn])

  const handleSearchValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <ScheduledRacesStyled>
      <div className='head-container'>
        <OneLineTitle text='scheduled races' customClass='title' />
      </div>
      <div className='search-container d-flex flex-column flex-sm-row align-items-sm-center'>
        <SearchInput searchValue={searchValue} handleSearchValueChanged={handleSearchValueChanged} />
        {auth.isLogged && <SwitchBtn title='My horse' isOn={isMyHorseOn} handleSwitchBtnClicked={toggleIsMyHorseOn} />}
      </div>
      <div className='content-container'>
        <RaceTable
          columns={memoizedSchedulingListColumns}
          data={races ?? []}
          isRowClickable
          raisePage={setParams}
          loader={loader}
          params={params}
        />
      </div>
    </ScheduledRacesStyled>
  )
}

export default ScheduledRaces
