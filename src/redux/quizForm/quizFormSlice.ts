import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type {
  TQuestionForm,
  TQuizDescriptionForm,
} from '@/components/CreateQuiz/schema'

import {
  questionFormErrorsToStoreErrors,
  quizDescriptionFormErrorsToStoreErrors,
} from './helpers'
import quizFormState, { defaultQuestion } from './initialState'

import type { IQuizDescriptionForm } from './types'

import type { FieldErrors } from 'react-hook-form'

export interface PartialQuestion {
  title?: string | undefined
  rightAnswerId?: number | undefined
  answers?: Array<{ text?: string | undefined } | undefined> | undefined
}

interface IUpdateQuestionPayload {
  index: number
  question: PartialQuestion
}
interface IAppendAnswerPayload {
  questionIndex: number
}
interface IRemoveAnswerPayload {
  questionIndex: number
  answerIndex: number
}
interface ISetQuestionErrorsPayload {
  questionIndex: number
  errors: FieldErrors<TQuestionForm>
}

export const quizFormSlice = createSlice({
  name: 'quizForm',
  initialState: quizFormState,
  reducers: {
    updateQuizDescription(
      state,
      { payload }: PayloadAction<Partial<IQuizDescriptionForm>>,
    ) {
      state.quizDescription = {
        ...state.quizDescription,
        ...payload,
      }
    },

    addQuestion(state) {
      state.questions.push(defaultQuestion)
    },
    updateQuestion(state, { payload }: PayloadAction<IUpdateQuestionPayload>) {
      const { question: payloadQuestion } = payload
      const question = state.questions[payload.index]

      const title = payloadQuestion.title ?? question.title
      const rightAnswerId =
        payloadQuestion.rightAnswerId ?? question.rightAnswerId
      const answers =
        payloadQuestion.answers?.map((payloadAnswer, idx) => {
          const answer = question.answers[idx]
          const text = payloadAnswer?.text ?? answer?.text

          return { text }
        }) ?? question.answers

      const updatedFields = {
        title,
        rightAnswerId,
        answers,
      }

      state.questions[payload.index] = {
        ...state.questions[payload.index],
        ...updatedFields,
      }
    },

    appendAnswer(state, { payload }: PayloadAction<IAppendAnswerPayload>) {
      const { questionIndex } = payload

      state.questions[questionIndex].answers.push({ text: '' })
    },
    removeAnswer(state, { payload }: PayloadAction<IRemoveAnswerPayload>) {
      const { questionIndex, answerIndex } = payload

      state.questions[questionIndex].answers.splice(answerIndex, 1)
    },

    setQuestionErrors(
      state,
      { payload }: PayloadAction<ISetQuestionErrorsPayload>,
    ) {
      const question = state.questions[payload.questionIndex]

      question.errors = questionFormErrorsToStoreErrors(payload.errors)
    },

    setQuizDescriptionErrors(
      state,
      { payload }: PayloadAction<FieldErrors<TQuizDescriptionForm>>,
    ) {
      state.quizDescription.errors =
        quizDescriptionFormErrorsToStoreErrors(payload)
    },
  },
})

export const {
  addQuestion,
  updateQuestion,
  updateQuizDescription,
  appendAnswer,
  removeAnswer,
  setQuestionErrors,
  setQuizDescriptionErrors,
} = quizFormSlice.actions
export default quizFormSlice.reducer
