import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom'

import { links } from 'apps'
import { TwoLineTitle } from 'shared'
import StyledRace from './styled'

const tabs = [
  {
    name: 'open',
    link: links.race.open()
  },
  {
    name: 'scheduled race',
    link: links.race.scheduledRaces()
  },
  {
    name: 'result',
    link: links.race.result()
  }
]

function RaceMain() {
  const { pathname: currentPathname } = useLocation()
  const outlet = useOutlet()
  const navigate = useNavigate()

  useEffect(() => {
    if (outlet === null) {
      navigate(links.race.open(), { replace: true })
    }
  }, [currentPathname])

  return (
    <StyledRace>
      <div className='container'>
        <div className='title-tabs-container'>
          <div className='title-tabs d-flex justify-content-center align-items-start'>
            {tabs.map(tab =>
              tab.link === currentPathname ? (
                <Link key={tab.name} to={tab.link} className='tab-link text-center'>
                  <TwoLineTitle text={tab.name} />
                </Link>
              ) : (
                <Link key={tab.name} to={tab.link} className='tab-link font-bold text-uppercase text-center'>
                  {tab.name}
                </Link>
              )
            )}
          </div>
        </div>
        <div className='content'>{outlet}</div>
      </div>
    </StyledRace>
  )
}

export default RaceMain
