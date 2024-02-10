'use client'

import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Image from 'next/image'

import RegistrationForm from '@/components/v2/Auth/RegistrationForm'
import Card from '@/components/v2/UI/Card'

const PageWrapper = styled('div')({
  height: '100vh',
})
const StyledCard = styled(Card)(() => {
  const cardOffset = 60
  return {
    position: 'absolute',
    right: cardOffset,
    top: cardOffset,
    bottom: cardOffset,
    minWidth: '33.33%',
    width: 600,
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

function RegistrationPage(): JSX.Element {
  return (
    <PageWrapper>
      <Image
        fill
        placeholder="blur"
        blurDataURL="/images/placeholders/auth-greetings.jpg"
        src="/images/lg/auth-greetings.jpg"
        alt="Игрушка Марио, приветственно раскинувшая руки"
        style={{ objectFit: 'cover' }}
      />

      <StyledCard>
        <Typography
          variant="h2"
          component="h2"
          sx={t => ({ mb: t.spacing(4) })}
        >
          Регистрация
        </Typography>
        <RegistrationForm sx={{ width: 450 }} />
      </StyledCard>
    </PageWrapper>
  )
}

export default RegistrationPage
