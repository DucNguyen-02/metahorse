import styled from 'styled-components'

const AbilityBoxStyled = styled.div`
  .ability-box-container {
    clip-path: polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px);
    background: ${({ theme }) => theme.color.gradientDarkGreen};
    padding: 1px;

    .ability-box {
      clip-path: polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px);
      background: ${({ theme }) => theme.color.neutral};
      padding: 23px 16px;

      .title {
        font-size: 16px;
        line-height: 19px;
      }

      .level {
      }
    }
  }

  .bottom-frame {
    bottom: -8px;
    right: 0;
    /* width: 100%; */
  }
`

export default AbilityBoxStyled
