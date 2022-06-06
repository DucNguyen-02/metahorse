import { NEXT_RACE_BORDER } from 'assets/images'
import styled from 'styled-components'

const thumbnailSize = {
  default: 58
}

const nextRaceDimensionRatio = 3.078

const NextRaceStyled = styled.div`
  width: 277px;
  height: calc(277px / ${nextRaceDimensionRatio});
  padding: 16px;
  padding-right: 20px;
  position: relative;

  background-image: url(${NEXT_RACE_BORDER});
  background-repeat: no-repeat;
  background-size: contain;

  ${({ theme }) => theme.media.lessThan(theme.size.lg)} {
    width: 300px;
    height: calc(300px / ${nextRaceDimensionRatio});
  }

  ${({ theme }) => theme.media.lessThan(theme.size.md)} {
    width: 250px;
    height: calc(250px / ${nextRaceDimensionRatio});
  }

  ${({ theme }) => theme.media.lessThan(theme.size.sm)} {
    width: 100%;
    height: 114px;
    padding: 28px;
  }

  .next-race {
    text-decoration: none;

    .left {
      .city {
        font-size: 12px;
        line-height: 14.4px;
      }

      .race-name {
        font-size: 16px;
        line-height: 19.2px;
        margin-bottom: 4px;
      }

      .price {
        font-size: 16px;
        line-height: 19.2px;
      }

      .text {
        margin-left: 10px;
        margin-top: -5px;
        span {
          margin-top: 2px;
        }
      }
    }

    .center {
      .text {
        font-size: 13px;
      }
    }

    .right {
      .thumbnail {
        width: ${thumbnailSize.default}px;
        height: ${thumbnailSize.default}px;
        object-fit: contain;
      }
    }
  }

  .bottom-frame {
    bottom: -8px;
    right: 0;

    ${({ theme }) => theme.media.lessThan(theme.size.md)} {
      width: 100%;
    }
  }
`

export default NextRaceStyled
