import styled from 'styled-components'

import { OPEN_RACE_BTN_BORDER } from 'assets/images'

interface RaceTableStyled {
  isRowClickable: boolean
}

const enterBtnDimensionRatio = 3.235

const RaceTableStyled = styled.div<RaceTableStyled>`
  .race-table-container {
    .race-table {
      ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
        overflow-x: scroll;
      }

      .loading {
        color: ${({ theme }) => theme.color.grey};
        height: 50px;
        width: 50px;
      }

      .table {
        min-width: 936px;
        border-collapse: separate;
        border-spacing: 0px 12px;

        .table-head {
          border-bottom: 2px solid ${({ theme }) => theme.color.black};

          .table-row {
            .th {
              color: ${({ theme }) => theme.color.grey};
              font-size: 16px;
              line-height: 20px;
            }
          }
        }
        .table-body {
          border-top: none;

          &.highlight tr {
            background-color: ${({ theme }) => theme.color.neutralOpacity};
          }

          &.highlight tr:nth-child(-n + 3) {
            background-color: ${({ theme }) => theme.color.neutral};
          }

          .table-row {
            border-color: ${({ theme }) => theme.color.transparent};
            height: 60px;
            position: relative;
            background-color: ${({ theme }) => theme.color.neutral};
            cursor: ${({ isRowClickable }) => (isRowClickable ? 'pointer' : 'default')};

            &::after {
              content: '';
              position: absolute;
              bottom: -12px;
              left: -12px;
              width: 10px;
              height: 10px;
              border-color: transparent transparent ${({ theme }) => theme.color.darkBlue} transparent;
              transform: rotate(225deg);
              border-width: 12px 12px 12px 12px;
              border-style: solid;
            }

            .table-data {
              vertical-align: middle;
              color: ${({ theme }) => theme.color.white};
              font-size: 16px;
              line-height: 20px;
              border: none;

              .unit {
                font-size: 12px;
              }

              .starts-in {
                column-gap: 8px;

                .dot {
                  width: 8px;
                  height: 8px;
                  border-radius: 20px;

                  background-color: ${({ theme }) => theme.color.red};
                }

                .live-text {
                  font-size: 16px;
                  line-height: 20px;
                }
              }

              .register-btn {
                background-color: ${({ theme }) => theme.color.transparent};
                background-image: url(${OPEN_RACE_BTN_BORDER});
                background-repeat: no-repeat;
                background-size: contain;
                border: none;

                width: 110px;
                height: calc(110px / ${enterBtnDimensionRatio});

                font-size: 16px;

                ${({ theme }) => theme.media.lessThan(theme.size.xl)} {
                  width: 90px;
                  height: calc(90px / ${enterBtnDimensionRatio});

                  font-size: 12px;
                }

                ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
                  width: 110px;
                  height: calc(110px / ${enterBtnDimensionRatio});

                  font-size: 16px;
                }

                ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
                  width: 140px;
                  height: calc(140px / ${enterBtnDimensionRatio});
                }
              }

              .horse-avatar {
                width: 33px;
              }
            }
          }
        }
      }
    }
  }
`

export default RaceTableStyled
