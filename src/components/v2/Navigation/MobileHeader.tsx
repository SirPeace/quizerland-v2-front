import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { useAppDispatch } from '@/redux/reduxHooks'
import { openMobileDrawer } from '@/redux/ui/uiSlice'

export const headerHeight = 60

const Header = styled('header')(({ theme }) => ({
  position: 'fixed',
  inset: '0 0 auto 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1),
  height: headerHeight,
  borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
  background: theme.palette.background.default,
  zIndex: theme.zIndex.appBar,
}))
const MenuButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(1),
  top: '50%',
  transform: 'translateY(-50%)',
}))
const HeaderTitle = styled(Typography)({
  textAlign: 'center',
  margin: '0 50px',
})

export default function MobileHeader(): JSX.Element {
  const dispatch = useAppDispatch()

  function handleMenuBtnClick(): void {
    dispatch(openMobileDrawer())
  }

  return (
    <Header>
      <MenuButton onClick={handleMenuBtnClick}>
        <MenuIcon />
      </MenuButton>
      <HeaderTitle variant="h4">Подборка тестов</HeaderTitle>
    </Header>
  )
}
