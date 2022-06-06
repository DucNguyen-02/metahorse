import MarketStyled from './styled'
import { TwoLineTitle } from 'shared'

function MarketMain() {
  return (
    <MarketStyled>
      <div className='container'>
        <div className='title-container d-flex flex-column align-items-center'>
          <TwoLineTitle text='market place' customClass='title' />
        </div>
      </div>
    </MarketStyled>
  )
}

export default MarketMain
