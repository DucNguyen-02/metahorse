import styled from 'styled-components'

const HorseCareerItemStyled = styled.tr`
  background-color: ${({ theme }) => theme.color.neutral};
  clip-path: polygon(100% 0, 100% 100%, 22px 100%, 0 calc(60px - 22px), 0 0);

  td {
    text-align: center;
    vertical-align: middle;
    padding: 12px 0;
    font-size: 16px;
    line-height: 20px;

    .class-tag {
      top: 4px;
    }

    .unit {
      font-size: 12px;
    }
  }
`

export default HorseCareerItemStyled
