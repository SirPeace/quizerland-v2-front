'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LockIcon from '@mui/icons-material/Lock'
import LoginIcon from '@mui/icons-material/Login'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { login } from '@/api/modules/auth'
import { setUser } from '@/redux/auth/authSlice'

import { useAppDispatch } from '@/redux/reduxHooks'

import { singInSchema, type TSingInSchema } from '../types'

import {
  boxFormDesktopStyle,
  boxFormLaptopStyle,
  containerDesktopStyle,
  containerLaptopStyle,
  headerTitleDesktopStyle,
  headerTitleLaptopStyle,
} from './styles'

import type { SubmitHandler } from 'react-hook-form'

const SignInForm = (): JSX.Element => {
  const theme = useTheme()
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))

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
      if (err instanceof AxiosError) {
        const error = err.response?.data?.message
        setErrorMessage(error)
      } else {
        setErrorMessage('Произошла ошибка, попробуйте позже')
      }
    }
  }

  return (
    <div className={isNotMobile ? containerDesktopStyle : containerLaptopStyle}>
      <div
        className={
          isNotMobile ? headerTitleDesktopStyle : headerTitleLaptopStyle
        }
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>
      </div>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className={isNotMobile ? boxFormDesktopStyle : boxFormLaptopStyle}
      >
        <div
          className={
            isNotMobile ? 'flex flex-col my-auto' : 'px-[1rem] my-auto'
          }
        >
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
              error={errors.email !== undefined}
            />
          </Box>

          <div>
            <p className="mt-0.5 pl-8 text-xs text-red-600 h-4">
              {errors.email !== undefined ? errors.email.message : ''}
            </p>
          </div>

          <Box className="flex items-end pt-[1rem]">
            <LockIcon sx={{ color: 'action.active', mr: 1, mb: 0.5 }} />
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
          <Alert icon={<ErrorOutlineIcon />} color="error" className="my-4">
            {errorMessage}
          </Alert>
        )}

        <div
          className={
            isNotMobile ? 'w-full mt-[2rem]' : 'w-full fixed bottom-1 pr-6'
          }
        >
          <Button
            type="submit"
            size="large"
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
            size="large"
            className="w-full mt-2 mb-2 normal-case"
            onClick={() => {
              router.push('auth/registration')
            }}
          >
            Нет аккаунта? Заведите новый.
          </Button>
        </div>
      </Box>
    </div>
  )
}

export default SignInForm
