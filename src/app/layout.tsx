'use client'

import './globals.css'
import { CssBaseline } from '@mui/material'
import { Inter } from 'next/font/google'

import SlidingDrawer from '@/components/navigation/Drawer/Drawer'
import Snackbar from '@/components/navigation/Snackbar/Snackbar'
import { ReduxProvider } from '@/redux/ReduxProvider'
import AuthWrapper from '@/wrappers/AuthWrapper'

const inter = Inter({ subsets: ['cyrillic'], preload: true })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="ru">
      <head>
        <title>Список тестов | Quizerland</title>
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

          <AuthWrapper>
            <SlidingDrawer />
            <Snackbar />
            <main className="text-gray-700">{children}</main>
          </AuthWrapper>
        </body>
      </ReduxProvider>
    </html>
  )
}
