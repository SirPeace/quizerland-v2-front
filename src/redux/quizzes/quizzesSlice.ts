import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import quizzesState from './initialState'

import type { ISetQuizzesPayload } from './types'

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: quizzesState,
  reducers: {
    appendQuizzes: (state, action: PayloadAction<ISetQuizzesPayload>) => {
      state.quizzes.push(...action.payload.quizzes)
      state.quizzesTotalCount = action.payload.totalCount
    },
  },
})

export const { appendQuizzes } = quizzesSlice.actions
export default quizzesSlice.reducer
