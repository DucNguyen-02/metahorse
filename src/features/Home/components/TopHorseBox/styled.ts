import { TOP_HORSE_BG } from 'assets/images'
import styled from 'styled-components'

enum Rank {
  FIRST = '1st',
  SECOND = '2nd',
  THIRD = '3rd'
}

type Position = '1st' | '2nd' | '3rd'

interface TopHorseBoxStyledProps {
  circle: string
  position: Position
}

const avatarContainerDimension = {
  default: 120,
  lg: 90,
  md: 60
}
const avatarDimension = {
  default: 110,
  lg: 80,
  md: 50
}

const TopHorseBoxStyled = styled.div<TopHorseBoxStyledProps>`
  .top-horse {
    background-image: url(${TOP_HORSE_BG});
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: contain;
    width: 274px;

    ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
      width: 100%;
    }

    .left-stick {
      top: 24px;
      right: 100%;
    }
    .right-stick {
      top: 24px;
      left: 100%;
    }
    .first-left-frame {
      right: calc(100% + 6px);
      bottom: 8px;
      display: none;
      display: ${({ position }) => position === Rank.FIRST && 'block'};

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        display: none;
      }
    }
    .first-right-frame {
      left: calc(100% + 6px);
      bottom: 8px;
      display: none;
      display: ${({ position }) => position === Rank.FIRST && 'block'};
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        display: none;
      }
    }
    .second-left-frame {
      right: 100%;
      bottom: 8px;
      display: none;
      display: ${({ position }) => position === Rank.SECOND && 'block'};
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        display: none;
      }
    }
    .second-right-frame {
      left: 100%;
      bottom: 8px;
      display: none;
      display: ${({ position }) => position === Rank.SECOND && 'block'};
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        display: none;
      }
    }

    .avatar-container {
      background-image: url(${({ circle }) => circle});
      background-repeat: no-repeat;
      background-size: contain;

      width: ${avatarContainerDimension.default}px;
      height: ${avatarContainerDimension.default}px;
      margin-bottom: 22px;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        width: ${avatarContainerDimension.lg}px;
        height: ${avatarContainerDimension.lg}px;
        margin-bottom: 18px;
      }

      ${({ theme }) => theme.media.lessThan(theme.size.md)} {
        width: ${avatarContainerDimension.md}px;
        height: ${avatarContainerDimension.md}px;
      }

      .avatar {
        width: ${avatarDimension.default}px;
        height: ${avatarDimension.default}px;
        object-fit: contain;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          width: ${avatarDimension.lg}px;
          height: ${avatarDimension.lg}px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          width: ${avatarDimension.md}px;
          height: ${avatarDimension.md}px;
        }
      }
    }

    .rank-container {
      margin-bottom: 12px;

      .crown {
        margin-bottom: 6px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          width: 28px;
        }
      }

      .rank {
        font-size: 16px;
        line-height: 19px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 14px;
        }
      }
    }

    .info-container {
      margin-bottom: 47px;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        margin-bottom: 20px;
      }

      .horse-name {
        font-size: 24px;
        line-height: 28px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 20px;
          line-height: 24px;
        }
      }

      .owner-name {
        font-size: 16px;
        line-height: 19px;

        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          font-size: 12px;
          line-height: 15px;
        }
      }
    }

    .achievement-container {
      column-gap: 50px;
      margin-bottom: 40px;

      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        column-gap: 18px;
        margin-bottom: 20px;
      }

      .achievement {
        .title {
          column-gap: 4px;

          span {
            ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
              font-size: 14px;
            }
          }

          img {
            ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
              width: 16px;
            }
          }
        }

        .times {
          font-size: 24px;
          line-height: 28px;

          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            font-size: 18px;
            line-height: 22px;
          }
        }
      }
    }
  }
`

export default TopHorseBoxStyled
