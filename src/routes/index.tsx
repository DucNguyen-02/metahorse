import { paths } from 'apps'
import { AuthFeature, HomeFeature, HorseFeature, MarketFeature, ProfileFeature, RaceFeature } from 'features'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function GlobalRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home.feature()} element={<HomeFeature />} />
        <Route path={paths.race.feature()} element={<RaceFeature />} />
        <Route path={paths.auth.feature()} element={<AuthFeature />} />
        <Route path={paths.horse.feature()} element={<HorseFeature />} />
        <Route path={paths.profile.feature()} element={<ProfileFeature />} />
        <Route path={paths.market.feature()} element={<MarketFeature />} />
      </Routes>
    </BrowserRouter>
  )
}

export default GlobalRoute
export { default as PrivateRoute } from './PrivateRoute'
export { default as PublicRoute } from './PublicRoute'
