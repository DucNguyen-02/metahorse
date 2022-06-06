import { ACHIEVEMENT, TOP_STABLE_AVATAR } from 'assets/images'
import { useGetRankInfo } from 'features/Home/hooks'
import { useHandleImageError } from 'hooks'
import { TopStable } from 'models'
import { shortenUserName } from 'utils/helper'
import TopStableBoxStyled from './styled'

interface TopStableBoxProps {
  stable: TopStable
  selfIndex: number
  customClass?: string
}

function TopStableBox({ stable, selfIndex, customClass = '' }: TopStableBoxProps) {
  const { medal } = useGetRankInfo(selfIndex)
  const handleStableAvatarError = useHandleImageError(TOP_STABLE_AVATAR)

  return (
    <TopStableBoxStyled className={customClass}>
      <div className='top-stable d-flex flex-column align-items-center mx-auto position-relative'>
        <div className='top-frame position-absolute w-100 d-none d-lg-block' />
        <img src={medal} alt='' className='medal position-absolute' />
        <div className='avatar-container d-flex align-items-center justify-content-center'>
          <img
            src={stable.owner_avatar ?? ''}
            alt={stable.owner_name}
            className='avatar'
            onError={handleStableAvatarError}
          />
        </div>
        <div className='name color-white font-bold'>{shortenUserName(stable.owner_name)}</div>
        <div className='achievement-container d-flex'>
          <div className='achievement text-center color-white font-bold'>
            <div className='title d-flex align-items-center'>
              <span>1</span>
              <img src={ACHIEVEMENT} alt='1' />
            </div>
            <div className='times'>{stable.first_count}</div>
          </div>
          <div className='achievement text-center color-white font-bold'>
            <div className='title d-flex align-items-center'>
              <span>2</span>
              <img src={ACHIEVEMENT} alt='2' />
            </div>
            <div className='times'>{stable.second_count}</div>
          </div>
          <div className='achievement text-center color-white font-bold'>
            <div className='title d-flex align-items-center'>
              <span>3</span>
              <img src={ACHIEVEMENT} alt='3' />
            </div>
            <div className='times'>{stable.third_count}</div>
          </div>
        </div>
      </div>
    </TopStableBoxStyled>
  )
}

export default TopStableBox
