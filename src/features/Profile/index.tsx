import { Route, Routes } from 'react-router-dom'

import { paths } from 'apps'
import { CommonLayout } from 'layouts'
import { PublicRoute } from 'routes'
import { ProfileMain } from './pages'

function Login() {
  return (
    <Routes>
      <Route
        path={paths.default()}
        element={
          <PublicRoute layout={CommonLayout}>
            <ProfileMain />
          </PublicRoute>
        }
      />
    </Routes>
  )
}

export default Login
