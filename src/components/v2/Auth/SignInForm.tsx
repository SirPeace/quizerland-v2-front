'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import LoginIcon from '@mui/icons-material/Login'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Box, { type BoxProps } from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'

import { login } from '@/api/modules/auth'
import Button from '@/components/v2/UI/Button'
import Link from '@/components/v2/UI/Link'
import useError from '@/hooks/useError'
import { setUser } from '@/redux/auth/authSlice'
import { useAppDispatch } from '@/redux/reduxHooks'
import { getMessageFromError } from '@/utils/error'

import { signInSchema, type TSignInSchema } from './validation'

const FormControl = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))
const ActionsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  '& > *:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
  '& > a': {
    cursor: 'pointer',
  },
}))

const SignInForm = (props: BoxProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { setErrorSnackbar } = useError()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<TSignInSchema> = async data => {
    try {
      // Запрос к db, авторизация пользователя
      const { data: verifiedUser } = await login(data)
      // Сохранение верифицированного пользователя в redux
      dispatch(setUser(verifiedUser))

      router.push('/quizzes')
    } catch (err: any) {
      const message = getMessageFromError(err)
      setErrorSnackbar(message ?? 'Произошла ошибка, попробуйте позже', {
        position: { vertical: 'bottom', horizontal: 'center' },
      })
    }
  }

  return (
    <Box {...props} component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Controller
          control={control}
          name="email"
          render={({ fieldState: { error }, field }) => (
            <TextField
              {...field}
              type="email"
              label="Email"
              autoComplete="current-email"
              placeholder="test@test.ru"
              error={undefined !== error}
              helperText={error?.message}
              fullWidth
              autoFocus
            />
          )}
        />
      </FormControl>

      <FormControl>
        <Controller
          control={control}
          name="password"
          render={({ fieldState: { error }, field }) => (
            <TextField
              {...field}
              type={showPassword ? 'text' : 'password'}
              label="Пароль"
              autoComplete="current-password"
              fullWidth
              error={undefined !== error}
              helperText={error?.message}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setShowPassword(v => !v)
                    }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
          )}
        />
      </FormControl>

      <ActionsWrapper>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
          startIcon={<LoginIcon />}
        >
          Войти
        </Button>
        <Link to="/auth/registration" sx={{ mt: 2 }}>
          Нет аккаунта? Заведите новый.
        </Link>
      </ActionsWrapper>
    </Box>
  )
}

export default SignInForm
