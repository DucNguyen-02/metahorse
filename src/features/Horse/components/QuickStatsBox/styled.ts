import styled from 'styled-components'

const QuickStatsBoxStyled = styled.div`
  .quick-stats-box {
    .top-line {
      width: 23px;
      height: 2px;
      background-color: ${({ theme }) => theme.color.grey};
      margin-bottom: 3px;
    }

    .content {
      gap: 12px;
      margin-bottom: 9px;

      .stats-type {
        font-size: 12px;
        line-height: 14px;
      }

      .current-value {
        font-size: 16px;
        line-height: 19px;
      }
    }

    .grey-line {
      width: 85px;
      height: 3px;
    }
  }
`

export default QuickStatsBoxStyled
