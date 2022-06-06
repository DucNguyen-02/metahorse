import { links } from 'apps'
import { NEXT_RACE_BOTTOM_FRAME, NEXT_RACE_THUMBNAIL } from 'assets/images'
import CountDownTime from 'features/Race/components/CountDownTime'
import { useHandleImageError } from 'hooks'
import { RecordRace } from 'models'
import { Link } from 'react-router-dom'
import { ClassTag } from 'shared'
import NextRaceStyled from './styled'
interface NextRaceBoxProps {
  race: RecordRace
  customClass?: string
  isInHomePage?: boolean
}

function NextRaceBox({ race, customClass = '', isInHomePage }: NextRaceBoxProps) {
  const handleRaceImageError = useHandleImageError(NEXT_RACE_THUMBNAIL)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStatus = (status: string, countDown: any) => {
    let result = null
    if (status === 'SCHEDULING') {
      result = 'scheduling ...'
    }

    if (status === 'WAITING') {
      result = CountDownTime(countDown)
    }

    if (status === 'LIVE') {
      result = (
        <div className='starts-in color-red font-bold d-flex align-items-center'>
          <div className='dot' /> <span className='live-text'>Live</span>
        </div>
      )
    }
    return result
  }

  return (
    <NextRaceStyled className={customClass}>
      <Link to={links.race.detail(race.id)} className='next-race d-flex justify-content-between'>
        <div className='left color-white'>
          <div className='d-flex'>
            <div className='city'>{race.course.city}</div>
            <ClassTag text={race.racing_class_name} isActive={true} isInHomePage={isInHomePage} />
          </div>
          <div className='race-name'>{race.name}</div>
          <div className='d-flex'>
            <div className='price color-primary font-bold'>${race.entry_fee} USD</div>
            <div className='text'>{handleStatus(race.status, race.count_down)}</div>
          </div>
        </div>
        <div className='right'>
          <img src={race.image || ''} alt='' className='thumbnail' onError={handleRaceImageError} />
        </div>
      </Link>
      <img src={NEXT_RACE_BOTTOM_FRAME} className='bottom-frame position-absolute' />
    </NextRaceStyled>
  )
}

export default NextRaceBox
