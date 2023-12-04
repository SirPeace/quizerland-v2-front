'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlternateEmail,
  ErrorOutline,
  HowToReg,
  Lock,
  Login,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { login } from '@/api/modules/auth'
import { setUser } from '@/redux/auth/authSlice'
import { useAppDispatch } from '@/redux/reduxHooks'

import { singInSchema, type TSingInSchema } from './types'

const SignInForm = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<undefined | string>()

  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleClickShowPassword = (): void => {
    setShowPassword(show => !show)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSingInSchema>({
    resolver: zodResolver(singInSchema),
  })

  const onSubmit: SubmitHandler<TSingInSchema> = async (
    data,
  ): Promise<void> => {
    try {
      // Запрос к db, авторизация пользователя
      const { data: verifiedUser } = await login(data)
      // Сохранение верифицированного пользователя в redux
      dispatch(setUser(verifiedUser))

      router.push('/quizzes')
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message
      if (typeof serverMessage === 'string') {
        setErrorMessage(serverMessage)
      } else {
        setErrorMessage('Произошла ошибка, попробуйте позже')
      }
    }
  }

  return (
    <Card raised className="flex flex-col items-center p-10 rounded-xl">
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <HowToReg />
      </Avatar>
      <Typography component="h1" variant="h5">
        Авторизация
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-8"
      >
        <div>
          <Box className="flex items-end">
            <AlternateEmail sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
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
              error={errors.email !== undefined}
            />
          </Box>

          <div>
            <p className="mt-0.5 pl-8 text-xs text-red-600 h-4">
              {errors.email !== undefined ? errors.email.message : ''}
            </p>
          </div>

          <Box className="flex items-end">
            <Lock sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
            <TextField
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              label="Пароль"
              autoComplete="current-password"
              fullWidth
              variant="standard"
              error={errors.password !== undefined}
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
            <p className="mt-0.5 pl-8 text-xs text-red-600 h-4">
              {errors.password !== undefined ? errors.password.message : ''}
            </p>
          </div>
        </div>

        {undefined !== errorMessage && (
          <Alert icon={<ErrorOutline />} color="error" className="my-4">
            {errorMessage}
          </Alert>
        )}

        <div className="mt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            className="w-full mt-2 mb-2"
            startIcon={<Login />}
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
            Нет аккаунта? Заведите новый.
          </Button>
        </div>
      </Box>
    </Card>
  )
}

export default SignInForm
