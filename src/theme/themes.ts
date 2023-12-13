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
      main: grey[300],
      dark: grey[300],
      light: grey[300],
      contrastText: '#222',
    },
  },
})
