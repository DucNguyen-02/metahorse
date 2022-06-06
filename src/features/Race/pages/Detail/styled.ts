import styled from 'styled-components'

const SchedulingLiveStyled = styled.div`
  .open-detail {
    padding-top: 4px;
    padding-bottom: 16px;
    .btn-black {
      font-size: 16px;
      line-height: 20px;
      color: ${({ theme }) => theme.color.white};
      position: relative;
      margin-top: 10px;
      .img-text-btn {
        text-decoration: none;
        color: ${({ theme }) => theme.color.white};
        .text-btn {
          position: absolute;
          top: 2px;
          left: 30px;
        }
      }
    }

    .line-grey {
      padding-top: 16px;
      border-bottom: 1px solid #2d3936;
      z-index: 1;
    }

    .container {
      .name-container {
        padding-top: 14px;
        margin-bottom: 28px;

        .name {
          font-size: 24px;
          line-height: 20px;
        }
      }

      .race-info-container {
        ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
          gap: 16px;
        }

        .info-left {
          ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
            padding-bottom: 10px;
          }

          ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
            overflow-x: scroll;
          }

          .left {
            gap: 28px;

            ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
              width: max-content;
            }

            .info-left-item {
              gap: 12px;

              .title {
                font-size: 12px;
                line-height: 14px;
              }

              .value {
                font-size: 16px;
                line-height: 19px;
              }
            }
          }
        }

        .info-right {
          gap: 40px;
          .info-right-item {
            .title {
              font-size: 12px;
              line-height: 14px;
              margin-bottom: 12px;
            }

            .value {
              font-size: 16px;
              line-height: 19px;
            }
          }
        }

        .replay-btn-container {
          clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0% calc(100% - 14px));
          background: ${({ theme }) => theme.color.primary};

          padding: 1px;
          width: 146px;
          aspect-ratio: 146 / 42;

          .replay-btn {
            clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0% calc(100% - 14px));
            border: none;
            background-color: ${({ theme }) => theme.color.black};

            font-size: 16px;
            line-height: 20px;
          }
        }
      }
    }

    .table-container {
      margin-top: 40px;
    }

    .prize-border {
      left: 0;
      top: -6px;
      width: 65px;
      height: 8px;
    }
  }
`

export default SchedulingLiveStyled
