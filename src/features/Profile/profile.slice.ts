import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CurrentUser } from 'models'

const initialState: CurrentUser = {
  lose_count: 0,
  name: '',
  public_address: '',
  total_race: 0,
  win_count: 0,
  win_rate: 0
}

export const profileSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (_, action: PayloadAction<CurrentUser>) => {
      return action.payload
    },

    logoutProfile: () => {
      return initialState
    }
  }
})

export const { setCurrentUser, logoutProfile } = profileSlice.actions

export default profileSlice.reducer
