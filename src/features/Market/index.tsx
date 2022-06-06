import { Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { CommonLayout } from 'layouts'
import { PublicRoute } from 'routes'
import { MarketMain } from './pages'

function Market() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={CommonLayout}>
            <MarketMain />
          </PublicRoute>
        }
      />
    </Routes>
  )
}

export default Market
