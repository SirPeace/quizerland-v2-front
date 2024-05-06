import Box, { type BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Image from 'next/image'

import Card from '@/components/v2/UI/Card'

const PageWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: '100dvh',
})
const StyledCard = styled(Card)(({ theme }) => {
  return {
    position: 'relative',
    zIndex: 1,
    minWidth: '33.33dvw',
    width: 600,
    minHeight: '33.33dvw',
    height: 600,
    margin: theme.spacing(6),
    padding: theme.spacing(4),
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down("md")]: {
      width: '100%',
      margin: theme.spacing(1),
      padding: theme.spacing(2),
    }
  }
})

function AuthLayout({ children, ...props }: BoxProps): JSX.Element {
  return (
    <PageWrapper {...props}>
      <Image
        fill
        placeholder="blur"
        blurDataURL="/images/placeholders/auth-greetings.jpg"
        src="/images/lg/auth-greetings.jpg"
        alt="Игрушка Марио, приветственно раскинувшая руки"
        style={{ objectFit: 'cover' }}
      />

      <StyledCard>
        {children}
      </StyledCard>
    </PageWrapper>
  )
}

export default AuthLayout
