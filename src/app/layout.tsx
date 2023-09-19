'use client'

import './globals.css'
import {
	ThemeProvider,
	CssBaseline,
	Switch,
	FormControlLabel,
} from '@mui/material'
import { Inter } from 'next/font/google'

import { useState } from 'react'

import MenuDrawer from '@/components/navigation/Drawer/Drawer'

import { darkTheme, lightTheme } from '../theme/themes'

import type { ChangeEvent } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}): JSX.Element {
	const [useDarkTheme, setUseDarkTheme] = useState(false)
	const [theme, setTheme] = useState(useDarkTheme ? darkTheme : lightTheme)

	const changeThemeHandler = (
		_target: ChangeEvent,
		currentValue: boolean,
	): void => {
		setUseDarkTheme(currentValue)
		setTheme(currentValue ? darkTheme : lightTheme)
	}

	return (
		<html lang="ru">
			<head>
				<title>Welcome to Quizerland</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="description"
					content="Приложение Nextjs для создания тестов"
				/>
				<link rel="icon" href="/favicon.ico" sizes="32x32" />
			</head>
			<ThemeProvider theme={theme}>
				<body id="__next" className={inter.className}>
					<div>
						<CssBaseline />
						<MenuDrawer />
						<FormControlLabel
							control={
								<Switch
									checked={useDarkTheme}
									inputProps={{ 'aria-label': 'Dark Mode' }}
									onChange={(target, value) => {
										changeThemeHandler(target, value)
									}}
								/>
							}
							label={useDarkTheme ? 'Светлый режим' : 'Темный режим'}
							labelPlacement="end"
							className="rounded-full fixed top-3 right-3"
						/>
					</div>

					{children}
				</body>
			</ThemeProvider>
		</html>
	)
}
