'use client'

import { grey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { Mulish, Pacifico, Russo_One } from 'next/font/google'

const pacificoFont = Pacifico({
  subsets: ['latin'],
  weight: '400',
  preload: true,
})
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
  },
  typography: {
    h1: {
      ...pacificoFont.style,
      fontSize: 40,
      background: '-webkit-linear-gradient(#FFB703, #FB8500)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      position: 'relative',
      lineHeight: 1.7,
      top: '-10%',
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
