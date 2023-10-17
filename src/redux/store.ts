import { configureStore, combineReducers } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import createQuizReducer from './createQuiz/createQuizSlice'
import quizReducer from './quiz/quizSlice'

const rootReducer = combineReducers({
  quizState: quizReducer,
  authState: authReducer,
  createQuizState: createQuizReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
