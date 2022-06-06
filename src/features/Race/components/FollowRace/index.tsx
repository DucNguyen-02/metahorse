import Live from 'features/Race/components/Live'
import Replay from 'features/Race/components/Replay'
import StarIn from 'features/Race/components/StarIn'

interface FollowRaceProps {
  status?: string
  firstTime: number
}

function FollowRace({ status, firstTime }: FollowRaceProps) {
  // handle room display follow race
  function handleDisplayFollowRace(status?: string, firstTime?: number) {
    let displayResult = null

    if (status === 'WAITING') {
      displayResult = <StarIn firstTime={firstTime} />
    }

    if (status === 'LIVE') {
      displayResult = <Live />
    }

    if (status === 'CLOSED') {
      displayResult = <Replay />
    }

    return displayResult
  }

  return <div>{handleDisplayFollowRace(status, firstTime)}</div>
}

export default FollowRace
