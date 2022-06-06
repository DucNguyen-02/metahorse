import { ACTIVE_TAG_BG, INACTIVE_TAG_BG, RACE_HOME } from 'assets/images'
import styled from 'styled-components'


interface ClassTagStyledProps {
  isActive: boolean
  canBeClicked: boolean
  isInHomePage: boolean
}

const ClassTagStyled = styled.div<ClassTagStyledProps>`
  height: 25px;
  width: ${({ isInHomePage }) => (isInHomePage ? '60px' : '71px')};
  margin-left: ${({ isInHomePage }) => (isInHomePage ? '10px' : '0px')};
  margin-top: ${({ isInHomePage }) => (isInHomePage ? '-3px' : '0px')};

  background-image: url(${({ isActive, isInHomePage }) => (isInHomePage ? RACE_HOME : isActive ? ACTIVE_TAG_BG : INACTIVE_TAG_BG)});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;

  cursor: ${({ canBeClicked }) => (canBeClicked ? 'pointer' : 'default')};

  .tag {
    font-size: ${({ isInHomePage }) => (isInHomePage ? '13px' : '16px')};
    line-height: 20px;
    color: ${({ theme, isActive }) => (isActive ? theme.color.white : theme.color.grey)};

    top: ${({ isInHomePage }) => (isInHomePage ? '32%' : '50%')};
    left: 50%;
    transform: translate(-50%, -50%);
    height: 15px;
  }
`

export default ClassTagStyled
