import horseApi from 'apis/horseApi'
import raceApi from 'apis/raceApi'
import { links } from 'apps'
import {
  ARROW_RIGHT,
  BLUE_ARROW_LEFT,
  BLUE_ARROW_RIGHT,
  JOIN_NOW_HORSE,
  JOIN_NOW_HORSE_SHADOW,
  LOGO_BANNER,
  MINI_LOGO,
  OPEN_RACE_CLASS
} from 'assets/images'
import { CategoryRace, NextRaceBox, OpenRaceBox, TopHorseBox, TopStableBox } from 'features/Home/components'
import { useAppSelector, useFetch } from 'hooks'
import { GetRaceListParams, GetRaceListResponse, GetTopParams, RaceStatus, TopHorse, TopStable } from 'models'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { OneLineTitle, TwoLineTitle } from 'shared'
import { isObjectEmptyArray } from 'utils/helper'
import StyledHome from './styled'

const categories = [
  {
    id: 1,
    name: 'discovery',
    thumbnail: OPEN_RACE_CLASS
  },
  {
    id: 2,
    name: 'class vi',
    thumbnail: OPEN_RACE_CLASS
  },
  {
    id: 3,
    name: 'class ii',
    thumbnail: OPEN_RACE_CLASS
  },
  {
    id: 4,
    name: 'class iv',
    thumbnail: OPEN_RACE_CLASS
  }
]

const getOpenRaceListParams: GetRaceListParams = {
  limit: 4,
  page: 1,
  status: RaceStatus.OPEN,
  freeRace: false,
  myHorse: false
}

const getNextRaceListParams: GetRaceListParams = {
  limit: 5,
  page: 1,
  status: RaceStatus.SCHEDULING,
  freeRace: false,
  myHorse: false
}

function moveIndex<T>(array: T[] | undefined, fromIndex: number, toIndex: number): T[] {
  if (!array || isObjectEmptyArray(array)) {
    return []
  }

  if (array.length <= 2) {
    return array
  }

  const element = array[fromIndex]
  array.splice(fromIndex, 1)
  array.splice(toIndex, 0, element)

  return array
}

const defaultGetTopParams: GetTopParams = {
  yearMonth: '2022-03'
}

function HomeMain() {
  const { data: openRaceListResponse } = useFetch<GetRaceListResponse, GetRaceListParams>({
    fetcher: raceApi.getRaceList,
    params: getOpenRaceListParams
  })
  const { data: nextRaceListResponse } = useFetch<GetRaceListResponse, GetRaceListParams>({
    fetcher: raceApi.getRaceList,
    params: getNextRaceListParams
  })
  const { data: topHorseList } = useFetch<TopHorse[], GetTopParams>({
    fetcher: horseApi.getTopHorses,
    params: defaultGetTopParams
  })
  const { data: topStableList } = useFetch<TopStable[], GetTopParams>({
    fetcher: horseApi.getTopStables,
    params: defaultGetTopParams
  })

  const memoizedTopHorseList = useMemo<TopHorse[]>(() => moveIndex(topHorseList, 1, 0), [topHorseList])
  const memoizedTopStableList = useMemo<TopStable[]>(() => moveIndex(topStableList, 1, 0), [topStableList])

  const auth = useAppSelector(state => state.auth)

  return (
    <StyledHome>
      <div className='container'>
        <div className='top-section d-flex flex-column flex-lg-row align-items-center align-items-lg-end'>
          <div className='top-left flex-grow-1'>
            <div className='banner position-relative'>
              <img src={LOGO_BANNER} className='logo-banner' />
              <div className='stream-title position-absolute font-bold color color-neutral_gray'>
                <span className='position-relative'>streaming now</span>
              </div>
            </div>
            <div className='video-container'>
              <div className='video'>
                <iframe
                  className='youtube-video'
                  src='https://www.youtube.com/embed/wB5h7VwW8GU?autoplay=1&mute=1'
                  title='YouTube video player'
                  frameBorder={0}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <div className='top-right'>
            <div className='head d-flex justify-content-between align-items-center'>
              <OneLineTitle text='next race' customClass='title' />
              <Link to={links.race.scheduledRaces()} className='view-btn'>
                <span className='color-white'>View all</span>
                <img src={ARROW_RIGHT} alt='' />
              </Link>
            </div>
            <div className='content'>
              {nextRaceListResponse?.records.map(race => (
                <NextRaceBox key={race.id} race={race} customClass='race-item' isInHomePage={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='bg-fluid'>
        <div className='container'>
          <div className='open-race-section'>
            <div className='head d-flex justify-content-between align-items-center align-items-lg-end'>
              <OneLineTitle text='open race' customClass='title' />
              <Link to={links.race.open()} className='view-btn'>
                <span className='color-white'>View all</span>
                <img src={ARROW_RIGHT} alt='' />
              </Link>
            </div>
            <div className='content row'>
              {openRaceListResponse?.records.map(race => (
                <OpenRaceBox
                  key={race.id}
                  race={race}
                  isInHomePage={true}
                  customClass='open-race-item col-12 col-sm-6 col-lg-3'
                />
              ))}
            </div>
            <div className='class-category d-flex align-items-center justify-content-center'>
              <img src={BLUE_ARROW_LEFT} alt='' className='arrow-left' />
              <div className='category-content d-flex align-items-center justify-content-sm-start justify-content-md-center'>
                {categories.map(category => (
                  <CategoryRace key={category.id} category={category} />
                ))}
              </div>
              <img src={BLUE_ARROW_RIGHT} alt='' className='arrow-right' />
            </div>
          </div>
        </div>
      </div>
      {!auth.isLogged && (
        <div className='join-now-fluid-bg'>
          <div className='container'>
            <div className='join-now position-relative d-flex justify-content-center justify-content-lg-start'>
              <div className='content d-flex flex-column align-items-center'>
                <div className='title font-bold color-white'>join now</div>
                <Link to={links.auth.index()}>
                  <button className='join-now-btn font-bold color-neutral_gray position-relative'>
                    <span>Start</span>
                    <img src={MINI_LOGO} alt='' className='position-absolute' />
                  </button>
                </Link>
              </div>
              <div className='horse-place d-none d-lg-block'>
                <img src={JOIN_NOW_HORSE_SHADOW} alt='' className='shadow position-absolute d-none d-lg-inline-block' />
                <img src={JOIN_NOW_HORSE} alt='' className='horse position-absolute d-none d-lg-inline-block' />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='top-horse-section'>
        <div className='container'>
          <div className='top-horse'>
            <div className='d-flex justify-content-center'>
              <TwoLineTitle text='top horses' customClass='top-horse-title' />
            </div>
            <div className='content row'>
              {memoizedTopHorseList.map((horse, index) => (
                <TopHorseBox key={horse.id} horse={horse} customClass='col-12 col-sm-4' selfIndex={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='top-stable-section'>
        <div className='container'>
          <div className='top-stable'>
            <div className='d-flex justify-content-center'>
              <TwoLineTitle text='top stables' customClass='top-stable-title' />
            </div>
            <div className='content row'>
              {memoizedTopStableList.map((stable, index) => (
                <TopStableBox
                  key={stable.owner_id + index}
                  stable={stable}
                  customClass='col-12 col-sm-4'
                  selfIndex={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </StyledHome>
  )
}

export default HomeMain
