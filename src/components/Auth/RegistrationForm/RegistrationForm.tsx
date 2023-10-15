'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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

import { useForm } from 'react-hook-form'

import { registrationSchema } from '../types'

import type { TRegistrationSchema } from '../types'

import type { SubmitHandler } from 'react-hook-form'

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TRegistrationSchema>({
    resolver: zodResolver(registrationSchema),
  })

  const onSubmit: SubmitHandler<TRegistrationSchema> = async (
    data,
  ): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
    const { confirmPassword, ...userDataRegistration } = data
    reset()
  }

  return (
    <Card raised className="flex flex-col items-center p-10 rounded-xl">
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <PersonAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Регистрация
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-8"
      >
        <div className="mb-8">
          <Box className="flex items-end">
            <AccountCircleIcon
              sx={{ color: 'action.active', mr: 1, mb: 0.5 }}
            />
            <TextField
              {...register('nickname')}
              type="text"
              label="Псевдоним пользователя"
              placeholder="Nickname"
              variant="standard"
              fullWidth
              autoFocus
            />
          </Box>

          <div>
            <p className="mt-0.5 pl-8 text-xs text-red-500 h-4">
              {errors.nickname !== undefined ? errors.nickname.message : ''}
            </p>
          </div>

          <Box className="flex items-end">
            <AlternateEmailIcon
              sx={{ color: 'action.active', mr: 1, mb: 0.5 }}
            />
            <TextField
              {...register('email')}
              type="email"
              label="Адрес электронной почты"
              placeholder="test@test.ru"
              fullWidth
              variant="standard"
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
              variant="standard"
              placeholder="testPassword_123"
              fullWidth
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

          <Box className="flex items-end">
            <EnhancedEncryptionIcon
              sx={{ color: 'action.active', mr: 1, mb: 0.5 }}
            />
            <TextField
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              label="Подтвердите пароль"
              placeholder="testPassword_123"
              variant="standard"
              fullWidth
            />
            <IconButton
              onClick={handleClickShowConfirmPassword}
              onMouseDown={handleClickShowConfirmPassword}
              sx={{ color: 'action.active', mb: -0.5, ml: 0.5 }}
            >
              {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </Box>

          <div>
            <p className="mt-0.5 pl-8 text-xs text-red-500 h-4">
              {errors.confirmPassword !== undefined
                ? errors.confirmPassword.message
                : ''}
            </p>
          </div>
        </div>

        <div className="mt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
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
