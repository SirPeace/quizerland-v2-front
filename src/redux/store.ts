import { configureStore, combineReducers } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import quizReducer from './quiz/quizSlice'
import quizFormReducer, {
  setQuestionFieldErrors,
  setQuizDescriptionFieldErrors,
} from './quizForm/quizFormSlice'
import quizzesReducer from './quizzes/quizzesSlice'
import uiReducer from './ui/uiSlice'

const rootReducer = combineReducers({
  quizFormState: quizFormReducer,
  quizState: quizReducer,
  authState: authReducer,
  quizzesState: quizzesReducer,
  uiState: uiReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          setQuestionFieldErrors.type,
          setQuizDescriptionFieldErrors.type,
        ],
        ignoredPaths: ['uiState.snackbar'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
