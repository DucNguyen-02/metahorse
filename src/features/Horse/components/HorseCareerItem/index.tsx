import dayjs from 'dayjs'

import { HorseCareer } from 'models'
import { ClassTag } from 'shared'
import { ordinalSuffixOf } from 'utils/helper'
import HorseCareerItemStyled from './styled'

interface HorseCareerItemProps {
  career: HorseCareer
}

function HorseCarrerItem({ career }: HorseCareerItemProps) {
  return (
    <HorseCareerItemStyled className='horse-career color-white w-100'>
      <td className='time font-bold'>
        {dayjs(career.race_date).format('YYYY-MM-DD')} | {dayjs(career.race_date).format('HH:mm')}
      </td>
      <td className='place'>
        {career.country} - {career.city}
      </td>
      <td className='class'>
        <ClassTag text={career.racing_class} isActive={true} customClass='class-tag' />
      </td>
      <td className='field'>{career.field_type}</td>
      <td className='distance font-bold'>{career.distance.toLocaleString()}m</td>
      <td className='rank font-bold color-yellow'>{ordinalSuffixOf(career.race_position)}</td>
      <td className='total-prize font-bold'>
        <span className='color-orange'>${career.total_prize} </span>
        <span className='unit'>USD</span>
      </td>
      <td className='entry-fee font-bold'>
        <span className='color-primary'>${career.entry_fee} </span>
        <span className='unit'>USD</span>
      </td>
    </HorseCareerItemStyled>
  )
}

export default HorseCarrerItem
