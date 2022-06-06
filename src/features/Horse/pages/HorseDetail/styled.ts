import styled from 'styled-components'
import { HORSE_AVATAR_BG, LEVEL_FRAME } from 'assets/images'

const HorseDetailStyled = styled.div`
  .horse-detail {
    padding: 44px 0;

    .horse-detail-container {
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        row-gap: 40px;
      }

      .horse-detail-left {
        padding: 0 40px;

        ${({ theme }) => theme.media.lessThan(theme.size.xxl)} {
          padding: 0 20px;
        }

        ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
          padding-left: 0;
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
            font-size: 16px;
            line-height: 20px;
            gap: 32px;

            .custom-energy {
              
            }
          }
        }
      }

      .horse-detail-right {
        .right {
          .name {
            font-size: 24px;
            line-height: 20px;
            margin-bottom: 24px;
          }

          .attribute-container {
            margin-bottom: 34px;
          }

          .ability-container {
            margin-bottom: 50px;
          }

          .level-stats-container {
            gap: 40px;

            ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
              gap: 30px;
            }

            .level-container {
              .level-bg {
                width: 140px;
                aspect-ratio: 1;
                background-image: url(${LEVEL_FRAME});
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;

                ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                  width: 120px;
                }

                .level {
                  font-size: 50px;
                  line-height: 60px;

                  ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                    font-size: 36px;
                  }
                }

                .level-text {
                  font-size: 32px;
                  bottom: 19px;
                  left: -8px;

                  ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                    font-size: 24px;
                  }
                }
              }
            }

            .stats-container {
              gap: 13px;

              ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
                gap: 10px;
              }
            }
          }
        }
      }
    }

    .horse-career-container {
      margin-top: 120px;

      ${({ theme }) => theme.media.lessThan(theme.size.xxl)} {
        margin-top: 100px;
      }

      ${({ theme }) => theme.media.lessThan(theme.size.md)} {
        margin-top: 80px;
      }

      .horse-career-title {
        margin-bottom: 26px;

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          margin-bottom: 14px;
        }

        .title {
          font-size: 24px;
          line-height: 20px;
        }
      }

      .horse-career-total {
        font-size: 14px;
        line-height: 16px;
        gap: 16px;
        margin-bottom: 30px;

        ${({ theme }) => theme.media.lessThan(theme.size.md)} {
          margin-bottom: 14px;
        }
      }

      .horse-career {
        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          overflow-x: scroll;
        }

        .horse-career-table {
          border-collapse: separate;
          border-spacing: 0px 12px;

          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            min-width: 936px;
          }
        }
      }
    }
  }
`

export default HorseDetailStyled
