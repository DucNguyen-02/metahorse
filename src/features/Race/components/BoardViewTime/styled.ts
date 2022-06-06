import styled from 'styled-components'
import { BOARD_VIEW_TIME } from 'assets/images'

const BoardViewTimeStyled = styled.div`
  .board-view-time {
    background-image: url(${BOARD_VIEW_TIME});
    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      background-image: none;
    }
    position: relative;
    width: 999px;
    height: 230px;
    left: 90px;
    ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
      left: -30px;
    }
    background-repeat: no-repeat;
    .time-remains {
      position: absolute;
      color: #a2a3a9;
      left: 45%;
      line-height: 20px;
      font-size: 18px;
      top: 24px;
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        left: 33%;
      }
      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        left: 18%;
      }
    }

    .display-time {
      position: absolute;
      color: ${({ theme }) => theme.color.white};
      left: 407px;
      line-height: 48px;
      font-size: 40px;
      display: flex;
      top: 64px;
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        left: 290px;
      }
      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        left: 140px;
      }
    }

    .hour-min-sec {
      position: absolute;
      color: #484b54;
      left: 39%;
      line-height: 14.4px;
      font-size: 12px;
      display: flex;
      top: 110px;
      span {
        margin-left: 25px;
        margin-right: 25px;
      }
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        left: 270px;
      }
      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        left: 120px;
      }
    }

    .finished-race {
      position: absolute;
      left: 37%;
      top: 35%;
      font-size: 40px;
      line-height: 48px;
      color: ${({ theme }) => theme.color.white};
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        left: 25%;
      }
      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        left: 10.5%;
      }
    }

    .orange-line-lean {
      position: absolute;
      display: flex;
      left: 35.5%;
      top: 131px;
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        left: 23.5%;
      }
      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        left: 8.5%;
      }

      .orange-line-lean-left {
        display: flex;
        margin-top: 10px;
      }

      .orange-line-lean-right {
        display: flex;
        margin-top: 10px;
      }

      .polygon {
        padding-left: 20.94px;
        padding-right: 20.94px;
        margin-top: 5px;
      }
    }

    .btn-view-race-2d {
      position: absolute;
      top: 183px;
      left: 43%;
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        left: 30.5%;
      }
      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        left: 15.5%;
      }
    }
  }
`
export default BoardViewTimeStyled
