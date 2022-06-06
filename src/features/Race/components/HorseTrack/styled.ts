import styled from 'styled-components'

interface HorseTrackStyledProps {
  distance: number
}

interface HorseAvatarStyledProps {
  distanceHorseMoved: number
}

interface trackListTranslateProps {
  trackListTranslate: number
}

const HOSRE_AVATAR_WIDTH = 43
const START_AREA_WIDTH = 58
const MILESTONE_DISTANCE = 200
export const EXTRA_DISTANCE = 50

export const HorseAvatarStyled = styled.img.attrs<HorseAvatarStyledProps>(({ distanceHorseMoved }) => ({
  style: {
    left: `${START_AREA_WIDTH + distanceHorseMoved}px`
  }
}))<HorseAvatarStyledProps>`
  width: ${HOSRE_AVATAR_WIDTH}px;
  height: 33px;
  object-fit: contain;
  object-position: right;
  transition-duration: 0.5s;
  transition-timing-function: linear;
`

export const TrackListTransLate = styled.div.attrs<trackListTranslateProps>(({ trackListTranslate }) => ({
  style: {
    transform: `translateX(${trackListTranslate}px)`
  }
}))<trackListTranslateProps>`
  z-index: 10;
  transition-duration: 0.5s;
  transition-timing-function: linear;
`

const HorseTrackStyled = styled.div<HorseTrackStyledProps>`
  .horse-track {
    height: 58px;
    width: ${({ distance }) => START_AREA_WIDTH + HOSRE_AVATAR_WIDTH + distance + EXTRA_DISTANCE}px;
    background-color: ${({ theme }) => theme.color.neutral};
    padding: 12px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0% calc(100% - 14px));

    .gate-container {
      width: 34px;
      aspect-ratio: 1;
      background-color: ${({ theme }) => theme.color.positionTrack};
      clip-path: polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0% calc(100% - 8px));

      .gate-number {
        font-size: 16px;
        line-height: 20px;
      }
    }

    .milestone-list-container {
      left: ${START_AREA_WIDTH + HOSRE_AVATAR_WIDTH}px;

      .milestone-block {
        width: ${MILESTONE_DISTANCE}px;
        height: 34px;
        border-right: 1.5px solid ${({ theme }) => theme.color.yellow};
      }
    }
  }
`

export default HorseTrackStyled
