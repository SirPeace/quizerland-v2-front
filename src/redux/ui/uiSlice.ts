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
  isMobileDrawerOpen: boolean
}
const initialState: UIState = {
  snackbar: undefined,
  isMobileDrawerOpen: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSnackbar: (state, { payload }: PayloadAction<UIState['snackbar']>) => {
      state.snackbar = payload
    },
    openMobileDrawer: state => {
      state.isMobileDrawerOpen = true
    },
    closeMobileDrawer: state => {
      state.isMobileDrawerOpen = false
    },
  },
})

export const { setSnackbar, openMobileDrawer, closeMobileDrawer } = uiSlice.actions
export default uiSlice.reducer
