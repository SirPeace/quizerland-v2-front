'use client'

import { Typography, styled } from '@mui/material'

import SignInForm from '@/components/v2/Auth/SignInForm'
import Card from '@/components/v2/UI/Card'
import ResponsiveImageBackground from '@/components/v2/UI/ResponsiveImageBackground'

const PageWrapper = styled('div')({
  height: '100vh',
})
const cardOffset = 60
const StyledCard = styled(Card)({
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
})

const getImageCoverSrc = (w: number, h: number): string =>
  '/images/lg/auth-greetings.jpg'

function AuthPage(): JSX.Element {
  return (
    <PageWrapper>
      <ResponsiveImageBackground resolveImgSrc={getImageCoverSrc}>
        <StyledCard>
          <Typography
            variant="h2"
            component="h2"
            sx={t => ({ mb: t.spacing(4) })}
          >
            Авторизация
          </Typography>
          <SignInForm sx={{ width: 450 }} />
        </StyledCard>
      </ResponsiveImageBackground>
    </PageWrapper>
  )
}

export default AuthPage
