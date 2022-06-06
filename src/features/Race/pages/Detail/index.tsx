import raceApi from 'apis/raceApi'
import { links } from 'apps'
import {
  CARET_LEFT,
  CROWN_BRONZE,
  CROWN_BRONZE_BORDER,
  CROWN_GOLD,
  CROWN_GOLD_BORDER,
  CROWN_SILVER,
  CROWN_SILVER_BORDER
} from 'assets/images'
import {
  BoardViewTime,
  ChooseHorseModal,
  FollowRace,
  RaceTable,
  RequestLoginModal,
  SchedulingLiveStarIn
} from 'features/Race/components'
import { useAppSelector, useFetch, usePreventBodyScroll, useToggle } from 'hooks'
import { Gate, GetRaceListParams, Race, RaceStatus } from 'models'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ClassTag } from 'shared'
import { openAndSchedulingDetailColumns, resultDetailColumns } from 'utils/columns'
import { capitalizeOnlyFirstLetter, ordinalSuffixOf, shortenUserName } from 'utils/helper'
import DetailStyled from './styled'

const convertToRaceGate = (race?: Race) => {
  if (!race) {
    return []
  }

  const { gates, race_prizes } = race

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gates.sort((gate1: any, gate2: any) => gate1?.race_position - gate2?.race_position)

  return gates.map((gate, index) => {
    if (gate.horse === null) {
      return { ...gate, gate: parseInt(gate.gate.slice(-2)) }
    }

    const htmlHorseString = `
        <div class="d-flex align-items-center justify-content-center gap-2">
          <img src=${gate.horse.avatar} class="horse-avatar" />
          <span>${gate.horse.name}</span>
        </div>
      `

    const positionHorseHaveTop = (url_img: string, imgHorseTopBorder: string) => {
      return `
          <div class="d-flex align-items-center justify-content-center gap-2">
              <img src=${imgHorseTopBorder} class='prize-border position-absolute' />
              <img src=${url_img} />
              <span class="font-bold">${ordinalSuffixOf(parseInt(gate.race_position))}</span>
          `
    }

    const positionHorseNoTop = () => {
      return `
          <div class="d-flex align-items-center justify-content-center gap-2">
            <span class="font-bold">${ordinalSuffixOf(parseInt(gate.race_position))}</span>
          `
    }

    const handlePositionHorse = () => {
      if (parseInt(gate.race_position) === 1) {
        return positionHorseHaveTop(CROWN_GOLD, CROWN_GOLD_BORDER)
      }
      if (parseInt(gate.race_position) === 2) {
        return positionHorseHaveTop(CROWN_SILVER, CROWN_SILVER_BORDER)
      }
      if (parseInt(gate.race_position) === 3) {
        return positionHorseHaveTop(CROWN_BRONZE, CROWN_BRONZE_BORDER)
      }
      return positionHorseNoTop()
    }

    const handleShowBloodline = () => {
      if (gate.horse?.bloodline.name) {
        return gate.horse.gender
          ? `${gate.horse.bloodline.name} - ${capitalizeOnlyFirstLetter(gate.horse.gender)}`
          : `${gate.horse.bloodline.name}`
      } else if (gate.horse?.gender) {
        return `${capitalizeOnlyFirstLetter(gate.horse.gender)}`
      } else {
        return '---'
      }
    }

    return {
      race_position: handlePositionHorse(),
      gate: parseInt(gate.gate.slice(-2)),
      horse: htmlHorseString,
      blood_line: handleShowBloodline(),
      statistic: `${gate.horse.career.first_count}-${gate.horse.career.second_count}-${gate.horse.career.third_count}`,
      owner_name: gate.horse.user.name,
      race_prize: race_prizes[index]?.prize
    }
  })
}

const getRegisteredQuantity = (gates: Gate[]) => gates.filter(gate => gate.horse !== null).length

function SchedulingLive() {
  const [joiningGate, setJoiningGate] = useState<number>(0)
  const { raceId } = useParams()
  const [triggerFetchRaceDetail, setTriggerFetchRaceDetail] = useState(false)
  const [isModalChooseHorseOpen, toggleIsChooseHorseModalOpen] = useToggle(false)
  const [isRequestLoginModalOpen, toggleIsRequestLoginModalOpen] = useToggle(false)
  usePreventBodyScroll(isModalChooseHorseOpen)
  usePreventBodyScroll(isRequestLoginModalOpen)
  const [viewRace2D, setViewRace2D] = useState(false)
  const [disableRaceTable, setDisableRaceTable] = useState(true)
  const [firstTime, setFirstTime] = useState(0)
  const { data: raceDetail } = useFetch<Race, number>(
    { fetcher: raceApi.getRace, params: typeof raceId === 'string' ? parseInt(raceId) : 0 },
    [raceId, triggerFetchRaceDetail]
  )
  const registeredGateQuantity = useMemo(() => getRegisteredQuantity(raceDetail?.gates ?? []), [raceDetail])
  const auth = useAppSelector(state => state.auth)
  const status = raceDetail?.status
  const [triggerReplay, toggleTriggerReplay] = useToggle(false)
  const [isRaceEnd, toggleIsRaceEnd] = useToggle(false)
  const [isRaceInProcess, toggleIsRaceInProcess] = useToggle(false)

  const memoizedOpenAndSchedulingDetailColumns = useMemo(() => openAndSchedulingDetailColumns, [])
  const memoizedResultDetailColumns = useMemo(() => resultDetailColumns, [])

  const handleRegisterButtonClick = (gateNumber: number) => {
    if (!auth.isLogged) {
      toggleIsRequestLoginModalOpen(true)

      return
    }

    setJoiningGate(gateNumber)

    toggleIsChooseHorseModalOpen()
  }

  // get time when access first room horse
  useEffect(() => {
    if (raceDetail && parseInt(raceDetail?.count_down) > 0) {
      const start_at = parseInt(raceDetail?.count_down)
      setFirstTime(start_at)
    }
  }, [raceDetail])

  // time waiting
  const timer = () => setFirstTime(firstTime - 1000)
  useEffect(() => {
    if (firstTime <= 0) {
      return
    }
    const id = setInterval(timer, 1000)
    return () => clearInterval(id)
  }, [firstTime])

  // handle room have status pending
  const handleDisplayColumn = () => {
    let displayColumns = null
    if (status === 'OPEN' || status === 'WAITING' || status === 'SCHEDULING') {
      displayColumns = memoizedOpenAndSchedulingDetailColumns
    } else {
      displayColumns = memoizedResultDetailColumns
    }
    return displayColumns
  }

  const gates = useMemo(() => convertToRaceGate(raceDetail), [raceDetail])
  const navigate = useNavigate()

  // handle room have status pending
  useEffect(() => {
    const open = links.race.open()
    function handleStatusRoom() {
      if (status === 'PENDING') return navigate(open)
    }
    handleStatusRoom()
  }, [status])

  // function handle button back to route links in race
  const handleBtnBack = () => {
    const scheduledRaces = links.race.scheduledRaces()
    const open = links.race.open()
    const result = links.race.result()
    let linkBack = ''

    if (status === 'OPEN') {
      linkBack = open
    }

    if (status === 'SCHEDULING' || status === 'WAITING' || status === 'LIVE') {
      linkBack = scheduledRaces
    }

    if (status === 'RESULT') {
      linkBack = result
    }

    if (status === 'CLOSED') {
      linkBack = result
    }

    return linkBack
  }

  // handle room have status LIVE
  useEffect(() => {
    if (status === 'LIVE') {
      setDisableRaceTable(false)
    }
  }, [status])

  // funtion handle display view time & live star in 2d
  function handleDisplayViewTimeRace() {
    let scheduledRaces = null

    if (status === 'LIVE') {
      scheduledRaces = (
        <SchedulingLiveStarIn
          detailResult={raceDetail}
          triggerReplay={triggerReplay}
          isRaceEnd={isRaceEnd}
          toggleIsRaceEnd={toggleIsRaceEnd}
          toggleIsRaceInProcess={toggleIsRaceInProcess}
        />
      )
    }

    if (status === 'WAITING') {
      scheduledRaces =
        viewRace2D === false ? (
          <BoardViewTime
            viewRace2D={setViewRace2D}
            idRaceDetail={raceDetail?.id}
            disableRaceTable={setDisableRaceTable}
            firstTime={firstTime}
          />
        ) : (
          <SchedulingLiveStarIn
            detailResult={raceDetail}
            triggerReplay={triggerReplay}
            isRaceEnd={isRaceEnd}
            toggleIsRaceEnd={toggleIsRaceEnd}
            toggleIsRaceInProcess={toggleIsRaceInProcess}
          />
        )
    }

    const open = ''
    const result =
      viewRace2D === false ? (
        <BoardViewTime
          viewRace2D={setViewRace2D}
          idRaceDetail={raceDetail?.id}
          disableRaceTable={setDisableRaceTable}
          firstTime={firstTime}
          status={status}
        />
      ) : (
        <SchedulingLiveStarIn
          detailResult={raceDetail}
          triggerReplay={triggerReplay}
          isRaceEnd={isRaceEnd}
          toggleIsRaceEnd={toggleIsRaceEnd}
          toggleIsRaceInProcess={toggleIsRaceInProcess}
        />
      )

    let displayViewRace = null

    if (status === 'OPEN') {
      displayViewRace = open
    }

    if (status === 'SCHEDULING' || status === 'WAITING' || status === 'LIVE') {
      displayViewRace = scheduledRaces
    }

    if (status === 'CLOSED') {
      displayViewRace = result
    }

    return displayViewRace
  }

  // function handle display racetable
  function handleDisplayRaceTable() {
    let displayRaceTable = null
    if (!disableRaceTable) {
      displayRaceTable = ''
    }

    const clonedGates = gates.map(gate => {
      gate.owner_name = shortenUserName(gate.owner_name)
      return gate
    })

    const defaultParams: GetRaceListParams = {
      limit: 10,
      page: 1,
      status: RaceStatus.SCHEDULING,
      freeRace: false,
      myHorse: false,
      search: ''
    }

    if (disableRaceTable) {
      displayRaceTable = (
        <RaceTable
          data={clonedGates}
          columns={handleDisplayColumn()}
          onRegisterButtonClick={handleRegisterButtonClick}
          loader={true}
          params={defaultParams}
          raisePage={defaultParams}
          status={status}
        />
      )
    }

    return displayRaceTable
  }

  const handleReplayBtnClick = () => {
    toggleTriggerReplay()

    if (isRaceEnd) {
      toggleIsRaceEnd(false)
      toggleIsRaceInProcess(false)
      return
    }

    toggleIsRaceInProcess(true)
  }

  const handleRaceDetailStatus = (status?: string) => {
    if (status && status === 'RESULT') {
      return (status = 'CLOSED')
    }
    return status
  }

  //function handle StarIn Live Result
  const handleStarInLiveResult = () => {
    let displayResult = null
    if (viewRace2D && status === 'LIVE') {
      displayResult = <FollowRace status={status} firstTime={firstTime} />
    } else if (viewRace2D && status === 'CLOSED') {
      displayResult = (
        <div className='replay-btn-container d-flex align-items-center'>
          <button onClick={handleReplayBtnClick} className='replay-btn font-bold w-100 h-100'>
            <span className='color-primary'>
              {isRaceEnd ? 'Replay' : triggerReplay ? 'Pause' : isRaceInProcess ? 'Resume' : 'Replay'}
            </span>
          </button>
        </div>
      )
    } else {
      displayResult = (
        <div className='info-right d-flex align-items-center'>
          <div className='info-right-item text-center'>
            <div className='title color-grey'>Race status</div>
            <div className='value color-yellow'>{handleRaceDetailStatus(raceDetail?.status)}</div>
          </div>
          <div className='info-right-item text-center'>
            <div className='title color-grey'>Entry Fee</div>
            <div className='value font-bold color-orange'>${raceDetail?.entry_fee}</div>
          </div>
          <div className='info-right-item text-center'>
            <div className='title color-grey'>Total prizes</div>
            <div className='value font-bold color-primary'>${raceDetail?.total_prize}</div>
          </div>
          {status === 'RESULT' ? (
            <div className='info-right-item text-center'>
              <div className='title color-grey'>Horse num</div>
              <div className='value color-white'>12</div>
            </div>
          ) : (
            <div className='info-right-item text-center'>
              <div className='title color-grey'>Horse number</div>
              <div className='value color-white'>{registeredGateQuantity}</div>
            </div>
          )}
        </div>
      )
    }

    return displayResult
  }

  return (
    <DetailStyled>
      <div className='open-detail'>
        <div className='container'>
          <div className='btn-black'>
            <Link to={handleBtnBack()} className='img-text-btn'>
              <img src={CARET_LEFT} alt='' />
              <span className='text-btn font-bold'>BACK</span>
            </Link>
          </div>
        </div>
        <div className='line-grey'></div>
        <div className='container'>
          <div className='name-container'>
            <div className='name font-bold color-white text-uppercase'>{raceDetail?.name}</div>
          </div>
          <div className='race-info-container d-flex flex-column flex-lg-row justify-content-between align-items-lg-center'>
            <div className='info-left'>
              <div className='left d-flex align-items-center'>
                <ClassTag text={raceDetail?.racing_class.name ?? ''} isActive={true} />
                <div className='info-left-item d-flex align-items-center'>
                  <span className='title color-grey'>Racecourse</span>
                  <span className='value color-white'>{capitalizeOnlyFirstLetter(raceDetail?.course.city)}</span>
                </div>
                <div className='info-left-item d-flex align-items-center'>
                  <span className='title color-grey'>Field type</span>
                  <span className='value color-white'>{capitalizeOnlyFirstLetter(raceDetail?.field_type.type)}</span>
                </div>
                <div className='info-left-item d-flex align-items-center'>
                  <span className='title color-grey'>Distance</span>
                  <span className='value color-white'>{raceDetail?.distance?.distance.toLocaleString() ?? '0'}m</span>
                </div>
              </div>
            </div>
            {handleStarInLiveResult()}
          </div>
        </div>
        <div className='line-grey'></div>
        <div className='container'>
          {handleDisplayViewTimeRace()}
          {handleDisplayRaceTable()}
        </div>
      </div>
      {isModalChooseHorseOpen && raceDetail && (
        <ChooseHorseModal
          race={raceDetail}
          toggleIsModalOpen={toggleIsChooseHorseModalOpen}
          joiningGate={joiningGate}
          setTriggerFetchRaceDetail={setTriggerFetchRaceDetail}
          hadJoined={raceDetail.had_joined}
        />
      )}
      {isRequestLoginModalOpen && <RequestLoginModal toggleIsModalOpen={toggleIsRequestLoginModalOpen} />}
    </DetailStyled>
  )
}

export default SchedulingLive
