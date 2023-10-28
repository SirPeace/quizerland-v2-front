import { createSlice } from '@reduxjs/toolkit'

import quizFormState, { newDefaultQuestion } from './initialState'

import type { IQuestionForm, IQuizDescription } from './types'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IUpdateQuestionPayload {
  index: number
  question: IQuestionForm
}
interface IUpdateQuizDescriptionPayload {
  title?: string
  description?: string
}

export const quizFormSlice = createSlice({
  name: 'quizForm',
  initialState: quizFormState,
  reducers: {
    addQuestion(state) {
      state.questions.push(newDefaultQuestion())
    },
    updateQuestion(state, { payload }: PayloadAction<IUpdateQuestionPayload>) {
      state.questions[payload.index] = payload.question
    },
    updateQuizDescription(
      state,
      { payload }: PayloadAction<IUpdateQuizDescriptionPayload>,
    ) {
      state.quizDescription.title = payload.title ?? ''
      state.quizDescription.description = payload.description ?? ''
    },
  },
})

export const { addQuestion, updateQuestion, updateQuizDescription } =
  quizFormSlice.actions
export default quizFormSlice.reducer
