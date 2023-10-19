import { createSlice } from '@reduxjs/toolkit'

import createQuizState from './initialState'

import type { IAnswerTemplate } from './types'

import type { PayloadAction } from '@reduxjs/toolkit'

const createQuizSlice = createSlice({
  name: 'createQuiz',
  initialState: createQuizState,
  reducers: {
    addNewAnswer: (state, action: PayloadAction<IAnswerTemplate>) => {
      const currentQuestion = state.questions.at(0)
      const answers = currentQuestion?.answers
      answers?.push(action.payload)
    },
    deleteAnswer: (state, action: PayloadAction<number>) => {
      const currentQuestion = state.questions.at(0)
      if (currentQuestion === undefined) return
      currentQuestion.answers = currentQuestion?.answers?.filter(
        answer => answer.id !== action.payload,
      )
    },
  },
})

export const { addNewAnswer, deleteAnswer } = createQuizSlice.actions

export default createQuizSlice.reducer
