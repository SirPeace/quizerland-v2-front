'use client'

import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import Loader from '@/components/v2/Loader'

const FullPageFlexWrapper = styled(Box)({
  width: '100%',
  height: '100dvh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

function LoadingPage(): JSX.Element {
  return (
    <FullPageFlexWrapper>
      <Loader />
    </FullPageFlexWrapper>
  )
}

export default LoadingPage
