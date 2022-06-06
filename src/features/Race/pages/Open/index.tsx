import { ChangeEvent, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'

import raceApi from 'apis/raceApi'
import { constants } from 'apps'
import { RaceTable, SwitchBtn } from 'features/Race/components'
import { useDebounce, useToggle, useUpdateEffect } from 'hooks'
import { GetRaceListParams, RaceClassNumber, RaceStatus, RecordRace } from 'models'
import { ClassTag, OneLineTitle, SearchInput } from 'shared'
import { openListColumns } from 'utils/columns'
import { handleAsyncRequest } from 'utils/helper'
import OpenStyled from './styled'

type Filter = {
  name: RaceClassNumber | 'All'
  isActive: boolean
}
type ClassFilters = Filter[]

const defaultClassFilters: ClassFilters = [
  {
    name: 'All',
    isActive: true
  },
  {
    name: RaceClassNumber.Class1,
    isActive: false
  },
  {
    name: RaceClassNumber.Class2,
    isActive: false
  },
  {
    name: RaceClassNumber.Class3,
    isActive: false
  },
  {
    name: RaceClassNumber.Class4,
    isActive: false
  },
  {
    name: RaceClassNumber.Class5,
    isActive: false
  },
  {
    name: RaceClassNumber.Class6,
    isActive: false
  },
  {
    name: RaceClassNumber.Class7,
    isActive: false
  },
  {
    name: RaceClassNumber.ClassFreeStyle,
    isActive: false
  }
]

const defaultParams: GetRaceListParams = {
  limit: 10,
  page: 1,
  status: RaceStatus.OPEN,
  freeRace: false,
  myHorse: false,
  search: ''
}

function Open() {
  const [params, setParams] = useState<GetRaceListParams>(defaultParams)
  const [classFilters, setClassFilters] = useState<ClassFilters>(defaultClassFilters)
  const [searchValue, setSearchValue] = useState<string>('')
  const [isFreeOn, toggleIsFreeOn] = useToggle(false)
  const debounceSearchValue = useDebounce<string>(searchValue, constants.DEBOUNCE_TIME)
  const [races, setRaces] = useState<RecordRace[]>([])
  const [loader, setLoader] = useState(true)

  const memoizedOpenListColumns = useMemo(() => openListColumns, [])

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
    setParams({ ...params, freeRace: isFreeOn, page: 1 })
  }, [isFreeOn])

  const updateClassFilters = useCallback((classFilters: ClassFilters, clickedFilter: Filter) => {
    const clonedClassFilters = [...classFilters]

    clonedClassFilters.forEach(filter => {
      if (filter.name === clickedFilter.name) {
        filter.isActive = true
      } else {
        filter.isActive = false
      }
    })

    return clonedClassFilters
  }, [])

  const updateParamsAfterFilterClicked = useCallback((params: GetRaceListParams, clickedFilter: Filter) => {
    const clonedParams = { ...params, page: 1 }

    if (clickedFilter.name !== 'All') {
      clonedParams.raceClass = clickedFilter.name
    } else {
      delete clonedParams.raceClass
    }

    return clonedParams
  }, [])

  const handleClassFilterClicked = useCallback(
    (filterName: Filter['name']) => () => {
      const clickedFilter = classFilters.find(filter => filter.name === filterName)

      if (!clickedFilter) return

      const newClassFilters = updateClassFilters(classFilters, clickedFilter)
      const newParams = updateParamsAfterFilterClicked(params, clickedFilter)

      setRaces([])
      setClassFilters(newClassFilters)
      setParams(newParams)
    },
    [classFilters, params]
  )

  const handleSearchValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <OpenStyled>
      <div className='head-container'>
        <OneLineTitle text='open races' customClass='title' />
      </div>
      <div className='search-container d-flex flex-column flex-lg-row align-items-md-start'>
        <SearchInput searchValue={searchValue} handleSearchValueChanged={handleSearchValueChanged} />
        <div className='class-filter-container d-flex flex-wrap align-items-center gap-3'>
          {classFilters.map(filter => (
            <ClassTag
              key={filter.name}
              text={filter.name}
              isActive={filter.isActive}
              onTagClicked={handleClassFilterClicked(filter.name)}
            />
          ))}
        </div>
        <SwitchBtn title='FREE' isOn={isFreeOn} handleSwitchBtnClicked={toggleIsFreeOn} />
      </div>
      <div className='content-container'>
        <RaceTable
          columns={memoizedOpenListColumns}
          data={races ?? []}
          isRowClickable
          raisePage={setParams}
          loader={loader}
          params={params}
        />
      </div>
    </OpenStyled>
  )
}

export default Open
