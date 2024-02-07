'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  ErrorOutline,
  Login,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import {
  Alert,
  Box,
  type BoxProps,
  TextField,
  Typography,
  IconButton,
  Link,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, type SubmitHandler, Controller } from 'react-hook-form'

import { login } from '@/api/modules/auth'
import Button from '@/components/v2/UI/Button'
import { setUser } from '@/redux/auth/authSlice'
import { useAppDispatch } from '@/redux/reduxHooks'

import { signInSchema, type TSignInSchema } from '../../Auth/types'

const FormControl = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))
const LinkWrapper = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(1),
  '& > a': {
    cursor: 'pointer',
  },
}))

const SignInForm = (props: BoxProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<undefined | string>()

  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<TSignInSchema> = async (
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
    <Box {...props} component="form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          control={control}
          name="email"
          render={({ fieldState: { error }, field }) => (
            <FormControl>
              <TextField
                {...field}
                type="email"
                label="Email"
                autoComplete="current-email"
                placeholder="test@test.ru"
                fullWidth
                autoFocus
              />

              {undefined !== error && (
                <Typography color="red" variant="caption">
                  {error.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ fieldState: { error }, field }) => (
            <FormControl>
              <TextField
                {...field}
                type={showPassword ? 'text' : 'password'}
                label="Пароль"
                autoComplete="current-password"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => {
                        setShowPassword(v => !v)
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />

              {undefined !== error && (
                <Typography color="red" variant="caption">
                  {error.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
      </div>

      {undefined !== errorMessage && (
        <Alert icon={<ErrorOutline />} color="error" className="my-4">
          {errorMessage}
        </Alert>
      )}

      <Box sx={theme => ({ mt: theme.spacing(3) })}>
        <Button
          type="submit"
          size="large"
          disabled={isSubmitting}
          variant="contained"
          className="w-full mt-2 mb-2"
          startIcon={<Login />}
        >
          Войти
        </Button>
        <LinkWrapper>
          <Link
            onClick={() => {
              router.push('auth/registration')
            }}
          >
            Нет аккаунта? Заведите новый.
          </Link>
        </LinkWrapper>
      </Box>
    </Box>
  )
}

export default SignInForm
