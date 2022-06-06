import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import raceApi from 'apis/raceApi'
import userApi from 'apis/userApi'
import { constants } from 'apps'
import { useDebounce, useEventListener, useFetch, useIsFirstRender, useIsMounted } from 'hooks'
import { EnterRaceError, Horse, JoinRaceBody, MyHorseListParams, Race } from 'models'
import { ClassTag, Modal, SearchInput } from 'shared'
import { handleAsyncRequest } from 'utils/helper'
import ChooseHorseItem from '../ChooseHorseItem'
import ChooseHorseModalStyled from './styled'

interface ChooseHorseModalProps {
  race: Race
  joiningGate: number
  toggleIsModalOpen: (value?: boolean) => void
  setTriggerFetchRaceDetail: Dispatch<SetStateAction<boolean>>
  hadJoined: boolean
}

const defaultHorseListParams: MyHorseListParams = {
  limit: 5,
  page: 1
}

const FETCH_HORES_REMAIN_HEIGHT = 100

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEnterRaceError = (candidate: any): candidate is EnterRaceError => {
  const isValid: boolean = candidate.code === constants.HTTP_STATUS.BAD_REQUEST && typeof candidate.message === 'string'

  return isValid
}

function ChooseHorseModal({
  race,
  joiningGate,
  toggleIsModalOpen,
  setTriggerFetchRaceDetail,
  hadJoined
}: ChooseHorseModalProps) {
  const horseListRef = useRef<HTMLDivElement>(null)
  const [horseListParamsRef, setHorseListParams] = useState<MyHorseListParams>(defaultHorseListParams)
  const [horseList, setHorseList] = useState<Horse[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoadingEnteringRace, setIsLoadingEnteringRace] = useState<boolean>(false)
  const isMounted = useIsMounted()
  const isFirstRender = useIsFirstRender()
  const debounceSearchValue = useDebounce<string>(searchValue, constants.DEBOUNCE_TIME)

  const { loading: horseListLoading, data: horseListResponse } = useFetch(
    { fetcher: userApi.getUserHorseList, params: horseListParamsRef },
    [horseListParamsRef]
  )

  const isFetchingHorseValid = (horseListDiv: HTMLDivElement): boolean => {
    const { scrollHeight, scrollTop, clientHeight } = horseListDiv
    const isValid: boolean =
      scrollHeight - (scrollTop + clientHeight) <= FETCH_HORES_REMAIN_HEIGHT &&
      !horseListLoading &&
      horseListResponse?.total_page !== horseListParamsRef.page

    return isValid
  }

  const handleHoresListScroll = () => {
    if (!horseListRef.current) return
    if (!isFetchingHorseValid(horseListRef.current)) return

    setHorseListParams({ ...horseListParamsRef, page: horseListParamsRef.page + 1 })
  }

  useEventListener('scroll', handleHoresListScroll, horseListRef)

  useEffect(() => {
    if (isFirstRender) return

    if (debounceSearchValue.length === 0) {
      setHorseListParams(defaultHorseListParams)

      return
    }

    setHorseList([])

    const newHorseListParams = { ...defaultHorseListParams, name: debounceSearchValue }
    setHorseListParams(newHorseListParams)
  }, [debounceSearchValue])

  useEffect(() => {
    if (!horseListResponse || !isMounted()) {
      return
    }

    const newHorseList: Horse[] = horseList.concat(horseListResponse.records)

    setHorseList(newHorseList)
  }, [horseListResponse])

  const handleSearchValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleChooseHorse = async (horseId: number) => {
    if (hadJoined) {
      setErrorMessage('Your horse is in this race already.')
      return
    }

    setIsLoadingEnteringRace(true)

    const joinRaceBody: JoinRaceBody = {
      horse_id: horseId,
      gate: joiningGate
    }

    const [error, responseData] = await handleAsyncRequest(raceApi.joinRace(race.id, joinRaceBody))

    if (error && isEnterRaceError(error)) {
      setErrorMessage(error.message)
    }

    if (responseData) {
      setTriggerFetchRaceDetail(value => !value)
      toggleIsModalOpen()
    }

    setIsLoadingEnteringRace(false)
  }

  return (
    <Modal onOverlayClick={toggleIsModalOpen}>
      <ChooseHorseModalStyled>
        <div className='choose-horse-modal'>
          <div className='race-name-container'>
            <div className='race-name color-white font-bold text-uppercase'>{race.name}</div>
          </div>
          <div className='race-info-container d-flex align-items-center'>
            <div className='race-class'>
              <ClassTag text={race.racing_class.name} isActive />
            </div>
            <div className='race-info-item d-flex align-items-center'>
              <span className='race-info-title color-grey'>Racecourse</span>
              <span className='race-info-content color-white'>{race.course.city}</span>
            </div>
            <div className='race-info-item d-flex align-items-center'>
              <span className='race-info-title color-grey'>Field type</span>
              <span className='race-info-content color-white'>{race.field_type.type}</span>
            </div>
            <div className='race-info-item d-flex align-items-center'>
              <span className='race-info-title color-grey'>Distance</span>
              <span className='race-info-content color-white'>{race.distance?.distance.toLocaleString()}m</span>
            </div>
            <div className='race-info-item d-flex align-items-center'>
              <span className='race-info-title color-grey'>Entry Fee</span>
              <span className='race-info-content font-bold color-orange'>${race.entry_fee}</span>
            </div>
          </div>
          <div className='search-horse-container d-flex align-items-center justify-content-between'>
            <div className='search-title color-white'>Select your horse for this race</div>
            <SearchInput
              searchValue={searchValue}
              handleSearchValueChanged={handleSearchValueChanged}
              customClass='search-input'
            />
          </div>
          <div className='error-container'>
            <p className='color-red'>{errorMessage}</p>
          </div>
          <div className='horse-list-container d-flex flex-column' ref={horseListRef}>
            {horseList &&
              horseList.map(horse => (
                <ChooseHorseItem
                  key={horse.id}
                  horse={horse}
                  onHorseClick={handleChooseHorse}
                  customClass={isLoadingEnteringRace ? 'pe-none' : ''}
                />
              ))}
          </div>
        </div>
      </ChooseHorseModalStyled>
    </Modal>
  )
}

export default ChooseHorseModal
