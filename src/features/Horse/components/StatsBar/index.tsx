import StatsBarStyled from './styled'

interface StatsBarProps {
  statsType: string
  statsRank: string
  currentValue: number
}

function StatsBar({ statsType, statsRank, currentValue }: StatsBarProps) {
  return (
    <StatsBarStyled currentStatsValue={currentValue}>
      <div className='stats-bar d-flex align-items-center'>
        <div className='stats-type color-white'>{statsType}</div>
        <div className='progress flex-grow-1 position-relative' />
        <div className='stats-rank color-white font-bold'>{statsRank}</div>
      </div>
    </StatsBarStyled>
  )
}

export default StatsBar
