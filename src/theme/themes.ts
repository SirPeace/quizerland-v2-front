'use client'

import { grey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    secondary: {
      main: grey[100],
      dark: grey[200],
      light: '#fff',
      contrastText: '#222',
    },
  },
})
