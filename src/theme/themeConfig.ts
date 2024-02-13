'use client'

import { grey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { Mulish, Russo_One } from 'next/font/google'

const russoOneFont = Russo_One({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  preload: true,
})
const mulishFont = Mulish({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  preload: true,
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFB703',
      dark: '#F4AF00',
      light: '#FCC844',
      contrastText: '#000',
    },
    secondary: {
      main: grey[800],
      dark: grey[900],
      light: '#fff',
      contrastText: '#222',
    },
    info: {
      main: '#219EBC',
      dark: '#219EBC',
      light: '#219EBC',
      contrastText: '#fff',
    },
  },
  typography: {
    h1: {
      ...russoOneFont.style,
      fontSize: 38,
      margin: 0,
    },
    h2: {
      ...russoOneFont.style,
      fontSize: 32,
      margin: 0,
    },
    h3: {
      ...russoOneFont.style,
      fontSize: 22,
      margin: 0,
    },
    button: {
      ...russoOneFont.style,
      fontSize: 16,
    },
    subtitle1: {
      ...russoOneFont.style,
      fontSize: 16,
    },
    body1: {
      ...mulishFont.style,
      fontSize: 16,
    },
    caption: {
      ...mulishFont.style,
      fontSize: 14,
    },
  },
})
