import { YELLOW_LINE } from 'assets/images'
import AttributeBoxStyled from './styled'

interface AttributeBoxProps {
  title: string
  value: string
  customClass?: string
}

function AttributeBox({ title, value, customClass = '' }: AttributeBoxProps) {
  return (
    <AttributeBoxStyled className={customClass}>
      <div className='attribute-box position-relative'>
        <div className='title color-yellow'>{title}</div>
        <div className='value color-white'>{value}</div>
        <img src={YELLOW_LINE} alt='' className='position-absolute line' />
      </div>
    </AttributeBoxStyled>
  )
}

export default AttributeBox
