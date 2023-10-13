'use client'

import { zodResolver } from '@hookform/resolvers/zod'

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

import { useForm } from 'react-hook-form'

import { singInSchema, type TSingInSchema } from '../types'

import type { SubmitHandler } from 'react-hook-form'

const SignInForm = (): JSX.Element => {
	const [showPassword, setShowPassword] = useState(false)

	const router = useRouter()

	const handleClickShowPassword = (): void => {
		setShowPassword((show) => !show)
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TSingInSchema>({
		resolver: zodResolver(singInSchema),
	})

	const onSubmit: SubmitHandler<TSingInSchema> = async (
		data,
	): Promise<void> => {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		console.log(data)
		reset()
	}

	return (
		<Card raised className="flex flex-col items-center p-10 rounded-xl">
			<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
				<HowToRegIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Авторизация
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mt-8"
			>
				<div className="mb-8">
					<Box className="flex items-end">
						<AlternateEmailIcon
							sx={{ color: 'action.active', mr: 1, mb: 0.5 }}
						/>
						<TextField
							{...register('email', {
								required: 'Укажите адрес электронной почты!',
							})}
							type="email"
							label="Адрес электронной почты"
							autoComplete="current-email"
							placeholder="test@test.ru"
							fullWidth
							variant="standard"
							autoFocus
						/>
					</Box>

					<div>
						<p className="mt-0.5 pl-8 text-xs text-red-500 h-4">
							{errors.email !== undefined ? errors.email.message : ''}
						</p>
					</div>

					<Box className="flex items-end">
						<LockIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
						<TextField
							{...register('password')}
							type={showPassword ? 'text' : 'password'}
							label="Пароль"
							autoComplete="current-password"
							placeholder="testPassword_123"
							fullWidth
							variant="standard"
						/>
						<IconButton
							onClick={handleClickShowPassword}
							onMouseDown={handleClickShowPassword}
							sx={{ color: 'action.active', mb: -0.5, ml: 0.5 }}
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</Box>

					<div>
						<p className="mt-0.5 pl-8 text-xs text-red-500 h-4">
							{errors.password !== undefined ? errors.password.message : ''}
						</p>
					</div>
				</div>

				<FormControlLabel
					control={<Checkbox color="primary" />}
					label="Запомнить меня"
				/>

				<div className="mt-2">
					<Button
						type="submit"
						disabled={isSubmitting}
						variant="contained"
						className="w-full mt-2 mb-2"
						startIcon={<LoginIcon />}
					>
						Войти
					</Button>
					<Button
						type="button"
						variant="text"
						className="w-full mt-2 mb-2 normal-case"
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
