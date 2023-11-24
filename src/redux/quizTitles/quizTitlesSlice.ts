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
  },
})

export const { setQuizzes } = quizTitlesSlice.actions
export default quizTitlesSlice.reducer
