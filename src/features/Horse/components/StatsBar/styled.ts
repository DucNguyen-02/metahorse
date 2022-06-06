import styled from 'styled-components'

interface StatsBarStyledProps {
  currentStatsValue: number
}

const StatsBarStyled = styled.div<StatsBarStyledProps>`
  .stats-bar {
    gap: 13px;

    .stats-type {
      font-size: 14px;
      line-height: 16px;
      min-width: 60px;
    }

    .progress {
      height: 2px;
      background-color: ${({ theme }) => theme.color.neutral};

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${({ theme }) => theme.color.orange};
        height: 100%;
        width: ${({ currentStatsValue }) => currentStatsValue}%;
      }
    }

    .stats-rank {
      width: 24px;
      font-size: 14px;
      line-height: 16px;
    }
  }
`

export default StatsBarStyled
