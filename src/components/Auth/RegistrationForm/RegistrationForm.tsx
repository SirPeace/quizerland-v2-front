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
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { registerUser } from '@/api/modules/auth'

import { setUser } from '@/redux/auth/authSlice'
import { useAppDispatch } from '@/redux/reduxHooks'

import { registrationSchema } from '../types'

import {
  boxFormRegDesktopStyle,
  boxFormRegLaptopStyle,
  containerRegDesktopStyle,
  containerRegLaptopStyle,
  headerTitleRegDesktopStyle,
  headerTitleRegLaptopStyle,
} from './styles'

import type { TRegistrationSchema } from '../types'

import type { SubmitHandler } from 'react-hook-form'

const RegistrationForm = (): JSX.Element => {
  const theme = useTheme()
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleClickShowPassword = (): void => {
    setShowPassword(show => !show)
  }
  const handleClickShowConfirmPassword = (): void => {
    setShowConfirmPassword(show => !show)
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
    const { confirmPassword, ...userDataRegistration } = data
    try {
      // Запрос к db, регистрация пользователя
      const { data } = await registerUser(userDataRegistration)
      // Сохранение верифицированного пользователя в redux
      dispatch(setUser(data))

      router.push('/quizzes')

      reset()
    } catch (err: any) {
      if (err instanceof AxiosError) {
        const error = err.response?.data?.message
        console.error(error)
      } else {
        console.error('Произошла ошибка, обратитесь в тех. поддержку')
      }
    }
  }

  return (
    <div
      className={
        isNotMobile
          ? `${containerRegDesktopStyle}`
          : `${containerRegLaptopStyle}`
      }
    >
      <div
        className={
          isNotMobile
            ? `${headerTitleRegDesktopStyle}`
            : `${headerTitleRegLaptopStyle}`
        }
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
      </div>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className={
          isNotMobile ? `${boxFormRegDesktopStyle}` : `${boxFormRegLaptopStyle}`
        }
      >
        <div
          className={
            isNotMobile ? 'flex flex-col my-auto' : 'px-[1rem] my-auto'
          }
        >
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
              error={errors.nickname !== undefined}
            />
          </Box>

          <div>
            <p className="mt-0.5 pl-8 text-xs text-red-600 h-4">
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
              error={errors.email !== undefined}
            />
          </Box>

          <div>
            <p className="mt-0.5 pl-8 text-xs text-red-600 h-4">
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
              fullWidth
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

          <Box className="flex items-end">
            <EnhancedEncryptionIcon
              sx={{ color: 'action.active', mr: 1, mb: 0.5 }}
            />
            <TextField
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              label="Подтвердите пароль"
              variant="standard"
              fullWidth
              error={errors.confirmPassword !== undefined}
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
            <p className="mt-0.5 pl-8 text-xs text-red-600 h-4">
              {errors.confirmPassword !== undefined
                ? errors.confirmPassword.message
                : ''}
            </p>
          </div>
        </div>

        <div
          className={
            isNotMobile ? 'w-full mt-[2rem]' : 'w-full fixed bottom-1 pr-6'
          }
        >
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
    </div>
  )
}

export default RegistrationForm
