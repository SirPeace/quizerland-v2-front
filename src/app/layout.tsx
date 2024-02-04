'use client'

import './globals.css'
import { Box, CssBaseline, ThemeProvider, styled } from '@mui/material'
import { Inter } from 'next/font/google'

import Snackbar from '@/components/Navigation/Snackbar'
import NavigationMenu from '@/components/v2/Navigation/NavigationMenu'
import { ReduxProvider } from '@/redux/ReduxProvider'
import { lightTheme } from '@/theme/themeConfig'
import AuthWrapper from '@/wrappers/AuthWrapper'

const inter = Inter({ subsets: ['cyrillic'], preload: true })

const AppContainer = styled('div')({
  display: 'flex',
  '& main': {
    flexGrow: 1,
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="ru">
      <head>
        <title>Quizerland</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Приложение Nextjs для создания тестов"
        />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>

      <ReduxProvider>
        <body id="__next" className={inter.className}>
          <CssBaseline />
          <ThemeProvider theme={lightTheme}>
            <AuthWrapper>
              <AppContainer>
                <NavigationMenu />
                <main>{children}</main>
              </AppContainer>
            </AuthWrapper>

            <Snackbar />
          </ThemeProvider>
        </body>
      </ReduxProvider>
    </html>
  )
}
