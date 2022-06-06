import styled from 'styled-components'

interface HorseTrackListStyledProps {
  distance: number
  translateX: number
}

export const HORSE_AVATAR_WIDTH = 43
export const START_AREA_WIDTH = 58

const HorseTrackListStyled = styled.div.attrs<HorseTrackListStyledProps>(({ translateX }) => {
  return {
    style: {
      transform: `translateX(-${translateX}px)`
    }
  }
})<HorseTrackListStyledProps>`
  transition-timing-function: linear;
  transition-duration: 0.5s;

  .milestone-container {
    width: ${({ distance }) => START_AREA_WIDTH + HORSE_AVATAR_WIDTH + distance}px;
    height: 50px;
    padding-left: ${START_AREA_WIDTH + HORSE_AVATAR_WIDTH}px;

    .race-milestone-block {
      width: 200px;

      .milestone-title {
        gap: 4px;
        right: 0;
        transform: translateX(50%);

        .milestone {
          font-size: 16px;
          line-height: 20px;
        }

        .triangle {
          clip-path: polygon(0 0, 50% 100%, 100% 0);
          background-color: ${({ theme }) => theme.color.yellow};
          width: 10px;
          aspect-ratio: 1;
        }
      }
    }
  }

  .horse-track-container {
    gap: 12px;
  }
`

export default HorseTrackListStyled
