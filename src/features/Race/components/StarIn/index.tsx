import dayjs from 'dayjs'
import StarInStyled from './Styled'

interface StarInProps {
  firstTime?: number
}

function StarIn({firstTime}:StarInProps){
  return(
    <StarInStyled>
      <div className='star-in'>Star In</div>
      <div className='hour-minute-sec'>{dayjs(firstTime).format('HH:mm:ss')}</div>
    </StarInStyled>
  )
}

export default StarIn
