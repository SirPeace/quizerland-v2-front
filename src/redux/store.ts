import { configureStore, combineReducers } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import quizReducer from './quiz/quizSlice'
import quizFormReducer, {
  setQuestionErrors,
  setQuizDescriptionErrors,
} from './quizForm/quizFormSlice'
import quizzesReducer from './quizzes/quizzesSlice'

const rootReducer = combineReducers({
  quizFormState: quizFormReducer,
  quizState: quizReducer,
  authState: authReducer,
  quizzesState: quizzesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [setQuestionErrors.type, setQuizDescriptionErrors.type],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
