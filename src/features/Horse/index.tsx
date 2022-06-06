import { Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { CommonLayout } from 'layouts'
import { PublicRoute } from 'routes'
import { HorseMain, HorseDetail } from './pages'

function Login() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={CommonLayout}>
            <HorseMain />
          </PublicRoute>
        }
      />
      <Route
        path={paths.horse.detail()}
        element={
          <PublicRoute layout={CommonLayout}>
            <HorseDetail />
          </PublicRoute>
        }
      />
    </Routes>
  )
}

export default Login
