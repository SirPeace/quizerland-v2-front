import { configureStore, combineReducers } from '@reduxjs/toolkit'

import quizReducer from './quiz/quizSlice'

const rootReduсer = combineReducers({
	quizState: quizReducer,
})

export const store = configureStore({
	reducer: rootReduсer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
