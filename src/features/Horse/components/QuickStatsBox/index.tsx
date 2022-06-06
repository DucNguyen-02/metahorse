import QuickStatsBoxStyled from './styled'
import { GREY_LINE } from 'assets/images'

interface QuickStatsBoxProps {
  customClass?: string
  statsType: string
  statsRank: string
}

function QuickStatBox({ customClass = '', statsType, statsRank }: QuickStatsBoxProps) {
  return (
    <QuickStatsBoxStyled className={customClass}>
      <div className='quick-stats-box'>
        <div className='top-line' />
        <div className='content d-flex align-items-end'>
          <div className='stats-type color-grey'>{statsType}</div>
          <div className='current-value color-white'>{statsRank}</div>
        </div>
        <img src={GREY_LINE} alt='' className='grey-line d-block' />
      </div>
    </QuickStatsBoxStyled>
  )
}

export default QuickStatBox
