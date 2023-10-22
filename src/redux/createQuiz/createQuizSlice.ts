import { createSlice } from '@reduxjs/toolkit'

import createQuizState from './initialState'

import type {
  IAnswerTemplate,
  ICreateQuizState,
  IQuestionTemplate,
} from './types'

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
    setDescription: (
      state,
      action: PayloadAction<Omit<ICreateQuizState, 'questions'>>,
    ) => {
      state.title = action.payload.title
      state.description = action.payload.description
    },
    setQuestion: (state, action: PayloadAction<IQuestionTemplate>) => {
      const currentQuestion = state.questions.find(
        question => question.id === action.payload.id,
      )
      if (currentQuestion === undefined) return

      currentQuestion.text = action.payload.text
      currentQuestion.correctAnswerId = action.payload.correctAnswerId
      currentQuestion.answers = action.payload.answers
    },
    addNewQuestion: (state, action: PayloadAction<IQuestionTemplate>) => {
      state.questions.push(action.payload)
    },
  },
})

export const {
  addNewAnswer,
  deleteAnswer,
  addNewQuestion,
  setDescription,
  setQuestion,
} = createQuizSlice.actions

export default createQuizSlice.reducer
