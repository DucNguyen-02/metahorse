import { HORSE_RANK_AVATAR_FRAME } from 'assets/images'
import styled from 'styled-components'

interface HorseRankBoxStyledProps {
  currentRank: number
}

const DISTANCE_FROM_TOP_TO_RANK_BOX_EVERY_RANK = 70

const HorseRankBoxStyled = styled.div.attrs<HorseRankBoxStyledProps>(({ currentRank }) => ({
  style: {
    top: currentRank * DISTANCE_FROM_TOP_TO_RANK_BOX_EVERY_RANK
  }
}))<HorseRankBoxStyledProps>`
  transition-duration: 0.5s;

  .horse-rank-box {
    padding: 12px 9px;
    height: 58px;
    width: 257px;

    gap: 12px;
    background-color: ${({ theme }) => theme.color.neutral};
    clip-path: polygon(calc(100% - 20px) 0%, 100% 20px, 100% 100%, 0 100%, 0 0);

    .avatar-container {
      width: 38px;
      aspect-ratio: 1;
      background-image: url(${HORSE_RANK_AVATAR_FRAME});
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;

      .avatar {
        width: 30px;
        aspect-ratio: 1;
      }
    }

    .name-container {
      .horse-name {
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
`

export default HorseRankBoxStyled
