import { createSlice } from '@reduxjs/toolkit'

import quizInitialState from './initialState'

// import type { PayloadAction } from '@reduxjs/toolkit'

const quizSlice = createSlice({
	name: 'quiz',
	initialState: quizInitialState,
	reducers: {
		// test: (state, action: PayloadAction<string>) => ({}),
	},
})

// export const { test } = quizSlice.actions
export default quizSlice.reducer
