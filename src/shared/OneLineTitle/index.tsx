import { ONE_LINE } from 'assets/images'
import OneLineTitleStyled from './styled'

interface OneLineTitleProps {
  text: string
  customClass?: string
}

function OneLineTitle({ text, customClass = '' }: OneLineTitleProps) {
  return (
    <OneLineTitleStyled className={customClass}>
      <div className='text color-primary font-bold'>{text}</div>
      <img src={ONE_LINE} alt='' className='line' />
    </OneLineTitleStyled>
  )
}

export default OneLineTitle
