import { createSlice } from '@reduxjs/toolkit'

import type { IQuizResponse } from '@/api/modules/types'

import quizState from './initialState'

import type { IQuestion, IAnswer } from './types'

import type { PayloadAction } from '@reduxjs/toolkit'

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: quizState,
  reducers: {
    setupState: (state, action: PayloadAction<IQuizResponse>) => {
      const questions = action.payload.quizItem.questions.map<IQuestion>(
        (question, idx) => {
          const questionItem: IQuestion = {
            id: idx,
            text: question.text,
            correctAnswerIndex: question.rightAnswerIndex,
            answers: question.answers.map<IAnswer>((answer, idx) => ({
              id: idx,
              text: answer,
            })),
          }

          return questionItem
        },
      )

      state.currentQuestionIndex = action.payload.progress.currentQuestionIndex
      state.rightAttempts = action.payload.progress.rightAttempts
      state.isFinished = action.payload.progress.isFinished
      state.progressId = action.payload.progress.id

      state.id = action.payload.quizItem.id
      state.userId = action.payload.quizItem.userId
      state.title = action.payload.quizItem.title
      state.description = action.payload.quizItem.description
      state.questions = questions
      state.createdAt = action.payload.quizItem.createdAt
    },

    resetState: () => quizState,

    goToNextQuestion: state => {
      if (state.currentQuestionIndex >= state.questions.length - 1) {
        state.isFinished = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    resetCurrentQuestion: state => {
      state.currentQuestionIndex = 0
      state.isFinished = false
      state.rightAttempts = 0
    },

    setRightAttempts: state => {
      state.rightAttempts += 1
    },

    setIsPreview: (state, action: PayloadAction<boolean>) => {
      state.isPreview = action.payload
    },
  },
})

export const {
  setupState,
  resetState,
  goToNextQuestion,
  resetCurrentQuestion,
  setRightAttempts,
  setIsPreview,
} = quizSlice.actions
export default quizSlice.reducer
