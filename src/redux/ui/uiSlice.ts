import { createSlice } from '@reduxjs/toolkit'

import type { SnackbarProps } from '@mui/material/Snackbar'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  snackbar?: {
    message: string
    duration?: SnackbarProps['autoHideDuration']
    position?: SnackbarProps['anchorOrigin']
    icon?: JSX.Element
    variant?: 'default' | 'success' | 'error'
  }
}
const initialState: UIState = {
  snackbar: undefined,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSnackbar: (state, { payload }: PayloadAction<UIState['snackbar']>) => {
      state.snackbar = payload
    },
  },
})

export const { setSnackbar } = uiSlice.actions
export default uiSlice.reducer
