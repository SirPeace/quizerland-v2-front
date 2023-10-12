'use client'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption'
import LockIcon from '@mui/icons-material/Lock'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const RegistrationForm = (): JSX.Element => {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const router = useRouter()

	const handleClickShowPassword = (): void => {
		setShowPassword((show) => !show)
	}
	const handleClickShowConfirmPassword = (): void => {
		setShowConfirmPassword((show) => !show)
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
		<Card raised className="flex flex-col items-center p-10 rounded-xl">
			<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
				<PersonAddIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Регистрация
			</Typography>
			<Box component="form" onSubmit={handleSubmit} className="w-full mt-8">
				<div className="mb-10">
					<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
						<AccountCircleIcon
							sx={{ color: 'action.active', mr: 1, my: 1.5 }}
						/>
						<TextField
							type="text"
							variant="standard"
							margin="normal"
							required
							fullWidth
							id="nickname"
							label="Псевдоним пользователя"
							name="nickname"
							autoComplete="nickname"
							autoFocus
						/>
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
						<AlternateEmailIcon
							sx={{ color: 'action.active', mr: 1, my: 1.5 }}
						/>
						<TextField
							type="email"
							variant="standard"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Адрес электронной почты"
							name="email"
							autoComplete="email"
						/>
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
						<LockIcon sx={{ color: 'action.active', mr: 1, my: 1.5 }} />
						<TextField
							type={showPassword ? 'text' : 'password'}
							variant="standard"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Пароль"
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

					<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
						<EnhancedEncryptionIcon
							sx={{ color: 'action.active', mr: 1, my: 1.5 }}
						/>
						<TextField
							type={showConfirmPassword ? 'text' : 'password'}
							variant="standard"
							margin="normal"
							required
							fullWidth
							name="confirm password"
							label="Подтвердите пароль"
							id="confirm password"
							// autoComplete="current-password"
							// helperText="Введите правильные данные"
						/>
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowConfirmPassword}
							onMouseDown={handleClickShowConfirmPassword}
							sx={{ color: 'action.active', my: 0.5 }}
						>
							{showConfirmPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</Box>
				</div>

				<div className="mt-2">
					<Button
						type="submit"
						fullWidth
						variant="contained"
						className="mt-2 mb-2"
						startIcon={<PersonAddAltRoundedIcon />}
					>
						Зарегистрироваться
					</Button>
					<Button
						type="button"
						fullWidth
						variant="text"
						className="mt-2 mb-2 normal-case"
						onClick={() => {
							router.push('/auth')
						}}
					>
						Вернуться на страницу авторизации
					</Button>
				</div>
			</Box>
		</Card>
	)
}

export default RegistrationForm
