import { createSlice } from '@reduxjs/toolkit'

import quizTitlesState from './initialState'

import type { IQuizTitle } from './types'

import type { PayloadAction } from '@reduxjs/toolkit'

export const quizTitlesSlice = createSlice({
  name: 'quizzes',
  initialState: quizTitlesState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<IQuizTitle[]>) => {
      state.quizzes = [...action.payload]
    },
    setQuizzesTotalCount: (state, action: PayloadAction<number>) => {
      state.quizzesTotalCount = action.payload
    },
  },
})

export const { setQuizzes, setQuizzesTotalCount } = quizTitlesSlice.actions
export default quizTitlesSlice.reducer
