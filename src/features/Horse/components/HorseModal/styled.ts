import styled from 'styled-components'
import { HORSE_AVATAR_BG } from 'assets/images'

const HorseModalStyled = styled.div`
  position: relative;

  .close-btn {
    top: 10px;
    right: 10px;
    background-color: ${({theme}) => theme.color.transparent};
    border: none;
    z-index: 1;
  }

  .quick-view {
    background-color: ${({ theme }) => theme.color.neutral};

    .quick-view-box {
      padding: 40px;

      ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
        padding: 20px;
      }

      .quick-view-container {
        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          row-gap: 40px;
        }

        .quick-view-left {
          padding-right: 40px;

          ${({ theme }) => theme.media.lessThan(theme.size.xxl)} {
            padding-right: 20px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
            padding-right: 40px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            padding-right: 0;
          }

          .left {
            .name {
              ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
                font-size: 24px;
                line-height: 20px;
              }
            }

            .background-container {
              .background {
                background-image: url(${HORSE_AVATAR_BG});
                background-repeat: no-repeat;
                background-position: center;
                padding: 40px;

                ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
                  padding: 40px 0;
                }

                ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                  background-size: cover;
                }

                .avatar {
                  width: 360px;
                  aspect-ratio: 360 / 280;
                  object-fit: contain;
                  object-position: center;

                  ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                    width: 100%;
                  }
                }
              }
            }

            .energy-container {
              .custom-energy {
                width: 80%;
              }
            }
          }
        }

        .quick-view-right {
          .right {
            .name {
              font-size: 24px;
              line-height: 20px;
              margin-bottom: 24px;
            }

            .attribute-container {
              margin-bottom: 34px;
            }

            .stats-container {
              margin-bottom: 34px;
            }
          }
        }
      }
    }
  }
`

export default HorseModalStyled
