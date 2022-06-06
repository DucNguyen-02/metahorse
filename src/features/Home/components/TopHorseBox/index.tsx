import {
  ACHIEVEMENT,
  TOP_HORSE_FIRST_LEFT_FRAME,
  TOP_HORSE_FIRST_RIGHT_FRAME,
  TOP_HORSE_LEFT_STICK,
  TOP_HORSE_RIGHT_STICK,
  TOP_HORSE_SECOND_LEFT_FRAME,
  TOP_HORSE_SECOND_RIGHT_FRAME
} from 'assets/images'
import { useGetRankInfo } from 'features/Home/hooks/'
import { TopHorse } from 'models'
import { shortenUserName } from 'utils/helper'
import TopHorseBoxStyled from './styled'

interface TopHorseBoxProps {
  horse: TopHorse
  selfIndex: number
  customClass?: string
}

function TopHorseBox({ horse, selfIndex, customClass = '' }: TopHorseBoxProps) {
  const { circle, crown, position } = useGetRankInfo(selfIndex)

  return (
    <TopHorseBoxStyled circle={circle} position={position} className={customClass}>
      <div className='top-horse d-flex flex-column align-items-center mx-auto position-relative'>
        <img src={TOP_HORSE_LEFT_STICK} className='left-stick position-absolute d-none d-md-inline-block' />
        <img src={TOP_HORSE_RIGHT_STICK} className='right-stick position-absolute d-none d-md-inline-block' />
        <img src={TOP_HORSE_FIRST_LEFT_FRAME} className='first-left-frame position-absolute' />
        <img src={TOP_HORSE_FIRST_RIGHT_FRAME} className='first-right-frame position-absolute' />
        <img src={TOP_HORSE_SECOND_LEFT_FRAME} className='second-left-frame position-absolute' />
        <img src={TOP_HORSE_SECOND_RIGHT_FRAME} className='second-right-frame position-absolute' />
        <div className='avatar-container d-flex align-items-center justify-content-center'>
          <img src={horse.horse_avatar} alt={horse.horse_name} className='avatar' />
        </div>
        <div className='rank-container d-flex flex-column align-items-center'>
          <img src={crown} alt='' className='crown' />
          <div className='rank color-white font-bold'>{position}</div>
        </div>
        <div className='info-container text-center'>
          <div className='horse-name color-white font-bold'>{horse.horse_name}</div>
          <div className='owner-name color-grey text-uppercase'>{shortenUserName(horse.owner)}</div>
        </div>
        <div className='achievement-container d-flex'>
          <div className='achievement text-center color-white font-bold'>
            <div className='title d-flex align-items-center'>
              <span>1</span>
              <img src={ACHIEVEMENT} alt='1' />
            </div>
            <div className='times'>{horse.first_count}</div>
          </div>
          <div className='achievement text-center color-white font-bold'>
            <div className='title d-flex align-items-center'>
              <span>2</span>
              <img src={ACHIEVEMENT} alt='2' />
            </div>
            <div className='times'>{horse.second_count}</div>
          </div>
          <div className='achievement text-center color-white font-bold'>
            <div className='title d-flex align-items-center'>
              <span>3</span>
              <img src={ACHIEVEMENT} alt='3' />
            </div>
            <div className='times'>{horse.third_count}</div>
          </div>
        </div>
      </div>
    </TopHorseBoxStyled>
  )
}

export default TopHorseBox
