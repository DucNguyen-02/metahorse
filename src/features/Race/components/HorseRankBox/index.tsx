import HorseRankBoxStyled from './styled'

interface HorseRankBoxProps {
  horseName: string
  subAvatar: string
  currentRank: number
}

function HorseRankBox({ horseName, subAvatar, currentRank }: HorseRankBoxProps) {
  return (
    <HorseRankBoxStyled className='position-absolute' currentRank={currentRank}>
      <div className='horse-rank-box d-flex align-items-center'>
        <div className='avatar-container d-flex align-items-center justify-content-center'>
          <img src={subAvatar} alt={horseName} className='avatar rounded-circle' />
        </div>
        <div className='name-container p-0 m-0'>
          <div className='horse-name color-white'>{horseName}</div>
        </div>
      </div>
    </HorseRankBoxStyled>
  )
}

export default HorseRankBox
