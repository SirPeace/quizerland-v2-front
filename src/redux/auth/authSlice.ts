import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  login as API_login,
  logout as API_logout,
  registerUser as API_registerUser,
  getAuthUser as API_getAuthUser,
} from '@/api/modules/auth'

import type { TSignInSchema } from '@/components/Auth/types'
import type { TRegistrationSchema } from '@/components/v2/Auth/validation'
import { getMessageFromError } from '@/utils/error'

import authState from './initialState'

import type { IUser } from './types'

export const getAuthUser = createAsyncThunk<IUser, undefined>(
  'async auth/getAuthUser',
  async (_, { rejectWithValue }) => {
    try {
      return await API_getAuthUser()
    } catch (err) {
      return rejectWithValue(getMessageFromError(err))
    }
  },
)

export const signInUser = createAsyncThunk<IUser, TSignInSchema>(
  'async auth/signInUser',
  async (authData, { rejectWithValue }) => {
    try {
      const response = await API_login(authData)
      return response.data
    } catch (err) {
      return rejectWithValue(getMessageFromError(err))
    }
  },
)

export const registerUser = createAsyncThunk<IUser, TRegistrationSchema>(
  'async auth/registerUser',
  async (authData, { rejectWithValue }) => {
    try {
      const response = await API_registerUser(authData)
      return response.data
    } catch (err) {
      return rejectWithValue(getMessageFromError(err))
    }
  },
)

export const signOutUser = createAsyncThunk<unknown, undefined>(
  'async auth/signOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await API_logout()
    } catch (err) {
      return rejectWithValue(getMessageFromError(err))
    }
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      state.user = payload
      state.isLoggedIn = true
    })
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.user = payload
      state.isLoggedIn = true
    })

    builder.addCase(signOutUser.fulfilled, state => {
      state.user = undefined
      state.isLoggedIn = false
    })
    builder
      .addCase(getAuthUser.fulfilled, (state, { payload }) => {
        state.user = payload
        state.isLoggedIn = true
      })
      .addCase(getAuthUser.rejected, (state, { payload }) => {
        state.user = undefined
        state.isLoggedIn = false
      })
  },
})

export default authSlice.reducer
