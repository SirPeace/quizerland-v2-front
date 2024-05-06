'use client'

import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import AuthLayout from '@/components/v2/Layouts/AuthLayout'
import SignInForm from '@/components/v2/Auth/SignInForm'

const StyledForm = styled(SignInForm)(({  theme  }) => ({
  width: 500,

  [theme.breakpoints.down('md')]: {
    width: '100%',
  }
}))

function AuthPage(): JSX.Element {
  return (
    <AuthLayout>
      <Typography variant="h2" component="h2" sx={t => ({ mb: t.spacing(4) })}>
        Авторизация
      </Typography>
      <StyledForm />
    </AuthLayout>
  )
}

export default AuthPage
