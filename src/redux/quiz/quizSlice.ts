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
	},
})

export const { nextQuestion } = quizSlice.actions
export default quizSlice.reducer
