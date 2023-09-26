import { configureStore, combineReducers } from '@reduxjs/toolkit'

import quizReducer from './quiz/reducer'

const rootReduser = combineReducers({
	quizState: quizReducer,
})

export const store = configureStore({
	reducer: rootReduser,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
