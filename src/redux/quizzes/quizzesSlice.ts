import { createSlice } from '@reduxjs/toolkit'

import quizzesState from './initialState'

import type { IQuizzesItem } from './types'

import type { PayloadAction } from '@reduxjs/toolkit'

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: quizzesState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<IQuizzesItem[]>) => {
      state.quizzes = [...state.quizzes, ...action.payload]
    },
    setQuizzesTotalCount: (state, action: PayloadAction<number>) => {
      state.quizzesTotalCount = action.payload
    },
  },
})

export const { setQuizzes, setQuizzesTotalCount } = quizzesSlice.actions
export default quizzesSlice.reducer
