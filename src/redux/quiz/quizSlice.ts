import { createSlice } from '@reduxjs/toolkit'

import type { IQuizResponse } from '@/api/modules/types'

import quizState from './initialState'

import type { IQuestion, IAnswer } from './types'

import type { PayloadAction } from '@reduxjs/toolkit'

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: quizState,
  reducers: {
    setup: (state, action: PayloadAction<IQuizResponse>) => {
      const questions = action.payload.questions.map<IQuestion>(
        (question, idx) => {
          const questionItem: IQuestion = {
            id: idx,
            text: question.text,
            correctAnswerId: +question.rightAnswerId,
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
    nextQuestion: state => {
      // const activeQuiz = state.quizzes.find(
      //   quiz => quiz.id === state.activeQuizId,
      // )
      // if (activeQuiz !== undefined) {
      //   activeQuiz.currentQuestionId += 1
      // }
    },
    setActiveQuiz: (state, action: PayloadAction<number>) => {
      // state.activeQuizId = action.payload
    },
    setIsFinishedQuiz: state => {
      // const activeQuiz = state.quizzes.find(
      //   quiz => quiz.id === state.activeQuizId,
      // )
      // if (activeQuiz !== undefined) {
      //   activeQuiz.isFinished = true
      // }
    },
    resetCurrentQuestion: (state, action: PayloadAction<number>) => {
      // const activeQuiz = state.quizzes.find(
      //   quiz => quiz.id === state.activeQuizId,
      // )
      // if (activeQuiz !== undefined) {
      //   activeQuiz.currentQuestionId = action.payload
      // }
    },
    goToAvailableQuiz: state => {
      // const availableQuiz = state.quizzes.find(quiz => !quiz.isFinished)
      // if (availableQuiz !== undefined) {
      //   state.activeQuizId = availableQuiz.id
      // }
    },
    setRightAttempts: state => {
      // const activeQuiz = state.quizzes.find(
      //   quiz => quiz.id === state.activeQuizId,
      // )
      // if (activeQuiz !== undefined) {
      //   activeQuiz.rightAttempts += 1
      // }
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
  setup,
  nextQuestion,
  setActiveQuiz,
  setIsFinishedQuiz,
  resetCurrentQuestion,
  goToAvailableQuiz,
  setRightAttempts,
  resetRightAttempts,
} = quizSlice.actions
export default quizSlice.reducer
