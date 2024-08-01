'use client'

import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import RegistrationForm from '@/components/v2/Auth/RegistrationForm'
import AuthLayout from '@/components/v2/Layouts/AuthLayout'

const StyledForm = styled(RegistrationForm)(({ theme }) => ({
  width: 500,

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

function RegistrationPage(): JSX.Element {
  return (
    <AuthLayout>
      <Typography variant="h2" component="h2" sx={t => ({ mb: t.spacing(4) })}>
        Регистрация
      </Typography>
      <StyledForm />
    </AuthLayout>
  )
}

export default RegistrationPage
