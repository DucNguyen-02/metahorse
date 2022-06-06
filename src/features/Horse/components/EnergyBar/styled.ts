import styled from 'styled-components'

interface EnergyBarStyledProps {
  currentEnergyPercent: number
}

const EnergyBarStyled = styled.div<EnergyBarStyledProps>`
  .energy-bar {
    gap: 12px;

    .energy-icon {
      width: 20px;
      height: 20px;
      object-fit: cover;
      object-position: center;

      top: 4px;
    }

    .energy-content {
      gap: 4px;
      .energy-text {
        font-size: 14px;
        line-height: 16px;
      }

      .bar {
        height: 4px;
        background-color: ${({ theme }) => theme.color.silverSand};

        &:after {
          content: '';
          display: block;
          height: 4px;
          position: absolute;
          top: 0;
          left: 0;
          width: ${({ currentEnergyPercent }) => currentEnergyPercent}%;
          background-color: ${({ theme }) => theme.color.yellow};
        }
      }
    }
  }
`

export default EnergyBarStyled
