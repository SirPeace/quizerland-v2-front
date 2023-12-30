import { configureStore, combineReducers } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import quizReducer from './quiz/quizSlice'
import quizzesReducer from './quizzes/quizzesSlice'

const rootReducer = combineReducers({
  quizState: quizReducer,
  authState: authReducer,
  quizzesState: quizzesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
