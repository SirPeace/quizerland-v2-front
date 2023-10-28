import { configureStore, combineReducers } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import quizReducer from './quiz/quizSlice'
import quizFormReducer from './quizForm/quizFormSlice'

const rootReducer = combineReducers({
  quizFormState: quizFormReducer,
  quizState: quizReducer,
  authState: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
