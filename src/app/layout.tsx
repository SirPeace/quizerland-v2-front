'use client'

import './globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Inter } from 'next/font/google'

import Snackbar from '@/components/Navigation/Snackbar'
import { ReduxProvider } from '@/redux/ReduxProvider'
import { lightTheme } from '@/theme/themeConfig'
import AuthWrapper from '@/wrappers/AuthWrapper'

const inter = Inter({ subsets: ['cyrillic'], preload: true })

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="ru">
      <head>
        <title>Quizerland</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Приложение Nextjs для создания тестов" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <CssBaseline />
      </head>

      <ReduxProvider>
        <ThemeProvider theme={lightTheme}>
          <body id="__next" className={inter.className}>
            <AuthWrapper>
              <div>{children}</div>
            </AuthWrapper>

            <Snackbar />
          </body>
        </ThemeProvider>
      </ReduxProvider>
    </html>
  )
}
