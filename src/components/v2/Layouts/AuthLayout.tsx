import Box, { type BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useWindowSize } from '@uidotdev/usehooks'
import Image from 'next/image'

import Card from '@/components/v2/UI/Card'

const PageWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: '100dvh',
})
const BackgroundImage = styled(Image)({
  position: 'fixed',
  zIndex: 0,
  objectFit: 'cover',
  objectPosition: '30% 50%'
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
  let { width: windowWidth, height: windowHeight } = useWindowSize()
  windowWidth ??= document.body.clientWidth
  windowHeight ??= document.body.clientHeight

  return (
    <PageWrapper {...props}>
      <BackgroundImage
        width={windowWidth}
        height={windowHeight}
        placeholder="blur"
        blurDataURL="/images/placeholders/auth-greetings.jpg"
        src="/images/lg/auth-greetings.jpg"
        alt="Игрушка Марио, приветственно раскинувшая руки"
      />

      <StyledCard>
        {children}
      </StyledCard>
    </PageWrapper>
  )
}

export default AuthLayout
