import { AVATAR_CHOOSE_HORSE_BG } from 'assets/images'
import styled from 'styled-components'

interface ChooseHorseItemStyledProps {
  currentEnergy: number
}

const ChooseHorseItemStyled = styled.div<ChooseHorseItemStyledProps>`
  clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0% calc(100% - 20px));
  padding: 1px;

  &:hover {
    background: ${({ theme }) => theme.color.primary};
  }

  .choose-horse-item {
    background-color: ${({ theme }) => theme.color.darkBlue};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 20px 100%, 0% calc(100% - 20px));
    padding: 20px;

    .left-container {
      .avatar-container {
        background-image: url(${AVATAR_CHOOSE_HORSE_BG});
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;

        margin-bottom: 10px;

        .avatar {
          width: 82px;
          aspect-ratio: 82/64;
          object-fit: contain;
          object-position: center;
        }
      }

      .energy-container {
        gap: 4px;

        .energy-icon {
          width: 20px;
          aspect-ratio: 1;
        }

        .energy-bar {
          width: 64px;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.1);

          &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: ${({ currentEnergy }) => currentEnergy}%;
            height: 100%;
            background-color: ${({ theme }) => theme.color.yellow};
          }
        }
      }

      .link-container {
        .link {
          font-size: 16px;
          line-height: 20px;
        }
      }
    }

    .mid-container {
      .horse-container {
        .name {
          font-size: 18px;
          line-height: 20px;
          margin-bottom: 4px;
        }

        .bloodline-gender {
          font-size: 14px;
          line-height: 16px;
          margin-bottom: 5px;
        }

        .class-type {
          margin-bottom: 6px;
        }

        .extra-info {
          gap: 8px;

          .title {
            font-size: 12px;
            line-height: 14px;
          }

          .content {
            font-size: 16px;
            line-height: 19px;
          }
        }
      }
    }

    .right-container {
      .stat-container-border {
        clip-path: polygon(calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%, 0 0);
        background-color: ${({ theme }) => theme.color.yellow};
        padding: 1px;

        .stat-container {
          clip-path: polygon(calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%, 0 0);
          background-color: ${({ theme }) => theme.color.darkBlue};
          padding: 12px;
          width: 170px;
          row-gap: 12px;

          .stat-item {
            gap: 8px;

            .stat-title {
              font-size: 12px;
              line-height: 14px;
            }

            .stat-content {
              font-size: 16px;
              line-height: 19px;
            }
          }
        }
      }
    }
  }
`

export default ChooseHorseItemStyled
