import { links } from 'apps'
import { OPEN_RACE_THUMBNAIL } from 'assets/images'
import { useHandleImageError } from 'hooks'
import { RecordRace } from 'models'
import { Link } from 'react-router-dom'
import { ClassTag } from 'shared'
import OpenRaceStyled from './styled'

interface OpenRaceBoxProps {
  race: RecordRace
  customClass?: string
  isInHomePage?: boolean
}

function OpenRaceBox({ race, customClass = '', isInHomePage }: OpenRaceBoxProps) {
  const handleRaceImageError = useHandleImageError(OPEN_RACE_THUMBNAIL)

  return (
    <OpenRaceStyled className={customClass}>
      <div className='open-race'>
        <div className='top position-relative'>
          <div className='top-frame position-absolute' />
          <img src={race.image || ''} alt='' onError={handleRaceImageError} />
          <div className='classtag'>
            <ClassTag text={race.racing_class_name} isActive={true} isInHomePage={isInHomePage} />
          </div>
          <div className='slot position-absolute d-flex align-items-center justify-content-center'>
            <span className='color-white'>{race.registered}/12</span>
          </div>
        </div>
        <div className='bottom color-white'>
          <div className='city'>{race.course.city}</div>
          <div className='name'>{race.name}</div>
          <div className='action d-flex align-items-center justify-content-between'>
            <div className='price color-primary font-bold'>${race.entry_fee} USD</div>
            <Link
              to={links.race.detail(race.id)}
              className='enter-btn p-0 color-secondary font-bold d-flex align-items-center justify-content-center'
            >
              <span>Enter</span>
            </Link>
          </div>
        </div>
      </div>
    </OpenRaceStyled>
  )
}

export default OpenRaceBox
