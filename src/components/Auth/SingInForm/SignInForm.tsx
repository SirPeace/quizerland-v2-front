'use client'

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LockIcon from '@mui/icons-material/Lock'
import LoginIcon from '@mui/icons-material/Login'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SignInForm = (): JSX.Element => {
	const [showPassword, setShowPassword] = useState(false)

	const router = useRouter()

	const handleClickShowPassword = (): void => {
		setShowPassword((show) => !show)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		})
	}

	return (
		<Card raised className="flex flex-col items-center p-10">
			<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
				<HowToRegIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Авторизация
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				className="w-full mt-8"
			>
				<div className="mb-10">
					<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
						<AlternateEmailIcon
							sx={{ color: 'action.active', mr: 1, my: 1.5 }}
						/>
						<TextField
							variant="standard"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Адрес электронной почты"
							name="email"
							autoComplete="email"
							autoFocus
						/>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
						<LockIcon sx={{ color: 'action.active', mr: 1, my: 1.5 }} />
						<TextField
							variant="standard"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Пароль"
							type={showPassword ? 'text' : 'password'}
							id="password"
							// autoComplete="current-password"
							// helperText="Введите правильные данные"
						/>
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleClickShowPassword}
							sx={{ color: 'action.active', my: 0.5 }}
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</Box>
				</div>

				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Запомнить меня"
				/>
				<div className="mt-2">
					<Button
						type="submit"
						fullWidth
						variant="contained"
						className="mt-2 mb-2"
						startIcon={<LoginIcon />}
					>
						Войти
					</Button>
					<Button
						type="button"
						fullWidth
						variant="text"
						className="mt-2 mb-2 normal-case"
						onClick={() => {
							router.push('auth/registration')
						}}
					>
						Нет аккаунта? Заведи новый.
					</Button>
				</div>
			</Box>
		</Card>
	)
}

export default SignInForm
