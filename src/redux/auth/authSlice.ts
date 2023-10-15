import { createSlice } from '@reduxjs/toolkit'

import authState, { defaultUser } from './initialState'

import type { IUser } from './types'
import type { PayloadAction } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      //   state.user = action.payload
      state.user = defaultUser
    },
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
