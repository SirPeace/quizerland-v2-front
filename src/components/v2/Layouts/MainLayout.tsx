import Box, { type BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import MobileHeader, { headerHeight } from '@/components/v2/Navigation/MobileHeader'
import NavigationMenu, { navigationMenuWidth } from '@/components/v2/Navigation/NavigationMenu'
import useAdaptive from '@/hooks/useAdaptive'

const StyledMainLayout = styled(Box)({
  minHeight: '100dvh',
  backgroundColor: '#FCFCFC',
})

function MainLayout({ children, ...props }: BoxProps): JSX.Element {
  const { isMobileOrTablet } = useAdaptive()

  return (
    <StyledMainLayout {...props}>
      <NavigationMenu />
      {isMobileOrTablet && <MobileHeader />}
      <main
        style={{
          marginLeft: isMobileOrTablet ? 0 : navigationMenuWidth,
          marginTop: isMobileOrTablet ? headerHeight : 0,
        }}
      >
        {children}
      </main>
    </StyledMainLayout>
  )
}

export default MainLayout
