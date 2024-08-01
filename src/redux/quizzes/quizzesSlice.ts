import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getQuizzes } from '@/api/modules/quizzes'
import type { IQuizzesResponse } from '@/api/modules/types'
import type { RootState } from '@/redux/store'

import { getMessageFromError } from '@/utils/error'

import quizzesState from './initialState'

export const fetchQuizzes = createAsyncThunk<IQuizzesResponse, undefined>(
  'async quizzes/fetchQuizzes',
  async (_, { rejectWithValue }) => {
    try {
      return await getQuizzes(0)
    } catch (err) {
      return rejectWithValue(getMessageFromError(err))
    }
  },
)

export const fetchMoreQuizzes = createAsyncThunk<IQuizzesResponse, undefined, { state: RootState }>(
  'async quizzes/fetchMoreQuizzes',
  async (_, { getState, rejectWithValue }) => {
    const { currentChunk } = getState().quizzesState
    const nextChunk = currentChunk === null ? 1 : currentChunk + 1

    try {
      return await getQuizzes(nextChunk)
    } catch (err) {
      return rejectWithValue(getMessageFromError(err))
    }
  },
)

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: quizzesState,
  reducers: {
    dropQuizzesState(state) {
      state.quizzes = []
      state.currentChunk = null
      state.quizzesTotalCount = null
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchQuizzes.fulfilled, (state, { payload }) => {
      state.quizzes = payload.quizzes
      state.quizzesTotalCount = payload.quizzesTotalCount
      state.currentChunk = 1
    })

    builder.addCase(fetchMoreQuizzes.fulfilled, (state, { payload }) => {
      const currentQuizzesIds = new Set<string>(state.quizzes.map(q => q.id))
      const newQuizzes = payload.quizzes.filter(q => !currentQuizzesIds.has(q.id))
      state.quizzes.push(...newQuizzes)

      state.currentChunk = state.currentChunk === null ? 1 : state.currentChunk + 1
    })
  },
})

export const { dropQuizzesState } = quizzesSlice.actions
export default quizzesSlice.reducer
