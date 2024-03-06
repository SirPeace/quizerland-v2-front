import Box, { type BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import NavigationMenu, {
  navigationMenuWidth,
} from '@/components/v2/Navigation/NavigationMenu'

const StyledMainLayout = styled(Box)({
  minHeight: '100dvh',
  backgroundColor: '#FCFCFC',

  '> main': {
    marginLeft: navigationMenuWidth,
  },
})

function MainLayout({ children, ...props }: BoxProps): JSX.Element {
  return (
    <StyledMainLayout {...props}>
      <NavigationMenu />
      <main>{children}</main>
    </StyledMainLayout>
  )
}

export default MainLayout
