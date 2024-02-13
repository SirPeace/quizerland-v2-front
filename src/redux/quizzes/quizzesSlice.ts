import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import quizzesState from './initialState'
import { type ISetQuizzesPayload } from './types'

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: quizzesState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<ISetQuizzesPayload>) => {
      state.quizzes = action.payload.quizzes
      state.quizzesTotalCount = action.payload.totalCount
    },
  },
})

export const { setQuizzes } = quizzesSlice.actions
export default quizzesSlice.reducer
