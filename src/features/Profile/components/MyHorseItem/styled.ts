import styled from 'styled-components'

const MyHorseItemStyled = styled.tr`
  clip-path: polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0 calc(100% - 14px));
  background-color: ${({ theme }) => theme.color.darkBlue};
  vertical-align: middle;

  cursor: pointer;
  td {
    padding: 8px 0;
    font-size: 16px;
    line-height: 20px;

    .horse-avatar {
      width: 33px;
    }

    .horse-class {
      top: 4px;
    }
  }
`

export default MyHorseItemStyled
