import { Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { CommonLayout } from 'layouts'
import { PublicRoute } from 'routes'
import { RaceMain, RaceOpen, RaceDetail, RaceScheduledRaces, RaceResult } from './pages'

function Race() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={CommonLayout}>
            <RaceMain />
          </PublicRoute>
        }
      >
        <Route path={paths.race.open()} element={<RaceOpen />} />
        <Route path={paths.race.scheduledRaces()} element={<RaceScheduledRaces />} />
        <Route path={paths.race.result()} element={<RaceResult />} />
      </Route>
      <Route
        path={paths.race.detail()}
        element={
          <PublicRoute layout={CommonLayout}>
            <RaceDetail />
          </PublicRoute>
        }
      />
    </Routes>
  )
}

export default Race
