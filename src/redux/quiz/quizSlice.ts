import { createSlice } from '@reduxjs/toolkit'

import quizState from './initialState'

import type { PayloadAction } from '@reduxjs/toolkit'

export const quizSlice = createSlice({
	name: 'quizzes',
	initialState: quizState,
	reducers: {
		nextQuestion: (state) => {
			const activeQuiz = state.quizzes.find(
				(quiz) => quiz.id === state.activeQuizId,
			)
			if (activeQuiz !== undefined) {
				activeQuiz.currentQuestionId += 1
			}
		},
		setActiveQuiz: (state, action: PayloadAction<number>) => {
			state.activeQuizId = action.payload
		},
		setIsFinishedQuiz: (state) => {
			const activeQuiz = state.quizzes.find(
				(quiz) => quiz.id === state.activeQuizId,
			)
			if (activeQuiz !== undefined) {
				activeQuiz.isFinished = true
			}
		},
		setCurrentQuestion: (state, action: PayloadAction<number>) => {
			const activeQuiz = state.quizzes.find(
				(quiz) => quiz.id === state.activeQuizId,
			)
			if (activeQuiz !== undefined) {
				activeQuiz.currentQuestionId = action.payload
			}
		},
		goToAvailableQuiz: (state) => {
			const availableQuiz = state.quizzes.find((quiz) => !quiz.isFinished)
			if (availableQuiz !== undefined) {
				state.activeQuizId = availableQuiz.id
			}
		},
	},
})

export const {
	nextQuestion,
	setActiveQuiz,
	setIsFinishedQuiz,
	setCurrentQuestion,
	goToAvailableQuiz,
} = quizSlice.actions
export default quizSlice.reducer
