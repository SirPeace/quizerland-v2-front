import Box, { type BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import NavigationMenu from '../Navigation/NavigationMenu'

const StyledMainLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100dvh',
  backgroundColor: '#FCFCFC',

  '& > main': {
    flexGrow: 1,
  },
}))

function MainLayout({ children, ...props }: BoxProps): JSX.Element {
  return (
    <StyledMainLayout {...props}>
      <NavigationMenu />
      <main>{children}</main>
    </StyledMainLayout>
  )
}

export default MainLayout
