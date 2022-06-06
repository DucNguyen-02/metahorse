import { Link } from 'react-router-dom'
import { links } from 'apps'

import { ORANGE_LINE_LEAN_LEFT, POLYGON, ORANGE_LINE_LEAN_RIGHT, BTN_VIEW_RACE_2D } from 'assets/images'

import BoardViewTimeStyled from './styled'
import dayjs from 'dayjs'

interface BoardViewTimeProps {
  viewRace2D: (value: boolean) => void
  idRaceDetail: number | undefined
  disableRaceTable: (value: boolean) => void
  firstTime: number
  status?: string
}

function BoardViewTime({ viewRace2D, idRaceDetail, disableRaceTable, firstTime, status }: BoardViewTimeProps) {
  const timeWaitingDown = dayjs(firstTime).format('HH:mm:ss')

  const handleViewRace2D = () => {
    viewRace2D(true)
    disableRaceTable(false)
  }

  const handleDisplayBoardView = () => {
    let resultBoardView = null
    if (status && status === 'CLOSED') {
      resultBoardView = <span className='finished-race font-bold'>FINISHED RACE</span>
    } else {
      resultBoardView = (
        <>
          <span className='time-remains font-bold'>TIME REMAINS</span>
          <div className='display-time font-bold'>
            <span>{timeWaitingDown?.split(':').join('\u00a0 \u00a0')}</span>
          </div>
          <div className='hour-min-sec font-bold'>
            <span>Hour</span>
            <span>Min</span>
            <span>Sec</span>
          </div>
        </>
      )
    }
    return resultBoardView
  }

  return (
    <BoardViewTimeStyled>
      <div className='board-view-time'>
        {handleDisplayBoardView()}
        <div className='orange-line-lean'>
          <div className='orange-line-lean-left'>
            <div>
              <img src={ORANGE_LINE_LEAN_LEFT} alt='' />
            </div>
          </div>
          <div className='polygon'>
            <img src={POLYGON} alt='' />
          </div>
          <div className='orange-line-lean-right'>
            <div>
              <img src={ORANGE_LINE_LEAN_RIGHT} alt='' />
            </div>
          </div>
        </div>
        <div className='btn-view-race-2d'>
          <Link to={links.race.detail(idRaceDetail)} onClick={() => handleViewRace2D()}>
            <img src={BTN_VIEW_RACE_2D} alt='' />
          </Link>
        </div>
      </div>
    </BoardViewTimeStyled>
  )
}

export default BoardViewTime
