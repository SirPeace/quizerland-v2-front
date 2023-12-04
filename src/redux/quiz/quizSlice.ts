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
      const questions = action.payload.questions.map<IQuestion>(
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

      state.id = action.payload._id
      state.userId = action.payload.userId
      state.title = action.payload.title
      state.description = action.payload.description
      state.questions = questions
    },

    goToNextQuestion: state => {
      if (state.currentQuestionIndex >= state.questions.length - 1) {
        state.isFinished = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    resetCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = 0
      state.isFinished = false
    },

    goToAvailableQuiz: state => {
      // const availableQuiz = state.quizzes.find(quiz => !quiz.isFinished)
      // if (availableQuiz !== undefined) {
      //   state.activeQuizId = availableQuiz.id
      // }
    },

    setRightAttempts: state => {
      state.rightAttempts += 1
    },

    resetRightAttempts: state => {
      // const activeQuiz = state.quizzes.find(
      //   quiz => quiz.id === state.activeQuizId,
      // )
      // if (activeQuiz !== undefined) {
      //   activeQuiz.rightAttempts = 0
      // }
    },
  },
})

export const {
  setupState,
  goToNextQuestion,
  resetCurrentQuestion,
  goToAvailableQuiz,
  setRightAttempts,
  resetRightAttempts,
} = quizSlice.actions
export default quizSlice.reducer
