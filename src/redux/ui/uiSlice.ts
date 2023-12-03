import { createSlice } from '@reduxjs/toolkit'

import type { AlertProps, SnackbarProps } from '@mui/material'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  snackbar?: {
    message: string
    duration?: SnackbarProps['autoHideDuration']
    position?: SnackbarProps['anchorOrigin']
    icon?: AlertProps['icon']
    alert?: {
      color: AlertProps['color']
      variant?: AlertProps['variant']
    }
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
