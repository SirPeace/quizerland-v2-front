import { createSlice } from '@reduxjs/toolkit'

import createQuizState from './initialState'

import type { PayloadAction } from '@reduxjs/toolkit'

const createQuizSlice = createSlice({
  name: 'createQuiz',
  initialState: createQuizState,
  reducers: {
    setSelectedQuestion: (state, action: PayloadAction<number>) => {},
  },
})

export const { setSelectedQuestion } = createQuizSlice.actions

export default createQuizSlice.reducer
