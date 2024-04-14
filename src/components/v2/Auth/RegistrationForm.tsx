'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Box, { type BoxProps } from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, type SubmitHandler, Controller } from 'react-hook-form'

import { registerUser } from '@/api/modules/auth'
import Button from '@/components/v2/UI/Button'
import useError from '@/hooks/useError'
import { setUser } from '@/redux/auth/authSlice'
import { useAppDispatch } from '@/redux/reduxHooks'

import { registrationSchema, type TRegistrationSchema } from './validation'

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

const RegistrationForm = (props: BoxProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { setErrorSnackbar } = useError()

  const router = useRouter()
  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TRegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit: SubmitHandler<TRegistrationSchema> = async (data): Promise<void> => {
    const { confirmPassword, ...formData } = data
    try {
      const { data } = await registerUser(formData)
      dispatch(setUser(data))
      router.push('/quizzes')
      reset()
    } catch (err: any) {
      setErrorSnackbar(err, {
        position: { vertical: 'bottom', horizontal: 'center' },
      })
    }
  }

  return (
    <Box {...props} component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Controller
          control={control}
          name="nickname"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="text"
              label="Псевдоним пользователя"
              placeholder="happy_little_accident"
              fullWidth
              autoFocus
              error={undefined !== error}
              helperText={error?.message}
            />
          )}
        />
      </FormControl>

      <FormControl>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="email"
              label="Адрес электронной почты"
              fullWidth
              error={undefined !== error}
              helperText={error?.message}
            />
          )}
        />
      </FormControl>

      <FormControl>
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type={showPassword ? 'text' : 'password'}
              label="Пароль"
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

      <FormControl>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type={showConfirmPassword ? 'text' : 'password'}
              label="Подтвердите пароль"
              fullWidth
              error={undefined !== error}
              helperText={error?.message}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setShowConfirmPassword(show => !show)
                    }}
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
          startIcon={<PersonAddAltRoundedIcon />}
        >
          Зарегистрироваться
        </Button>
        <Link
          onClick={() => {
            router.push('/auth')
          }}
        >
          Вернуться на страницу авторизации
        </Link>
      </ActionsWrapper>
    </Box>
  )
}

export default RegistrationForm
