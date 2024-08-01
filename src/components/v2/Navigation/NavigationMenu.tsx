'use client'

import CloseIcon from '@mui/icons-material/Close'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import PostAddIcon from '@mui/icons-material/PostAdd'
import Box from '@mui/material/Box'
import MUIDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'

import Logo from '@/components/v2/Logo'
import Card from '@/components/v2/UI/Card'
import useAdaptive from '@/hooks/useAdaptive'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'
import { closeMobileDrawer } from '@/redux/ui/uiSlice'

import AuthBadge from './AuthBadge'
import ColorThemeSelect from './ColorThemeSelect'

import type { ReactNode } from 'react'

export const navigationMenuWidth = 300

const Drawer = styled(MUIDrawer)(({ theme }) => ({
  '> .MuiDrawer-paper': {
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    width: navigationMenuWidth,
    maxWidth: '100%',
    backgroundColor: '#FCFCFC',
    overflow: 'hidden',
    borderRight: '1px solid rgba(0, 0, 0, 0.15)',
    padding: theme.spacing(2),
  },
}))
const DrawerCloseBtn = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}))
const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}))
const Footer = styled('footer')({})

const navigationLinks = [
  {
    href: '/quizzes',
    text: 'Список тестов',
    icon: <FactCheckIcon color="secondary" />,
  },
  {
    href: '/create-quiz',
    text: 'Создать тест',
    icon: <PostAddIcon color="secondary" />,
  },
]

function NavigationMenu(): ReactNode {
  const { isMobileDrawerOpen } = useAppSelector(({ uiState }) => uiState)
  const dispatch = useAppDispatch()

  const { isTabletOrDown, isMobile } = useAdaptive()

  const router = useRouter()

  function handleClose(): void {
    dispatch(closeMobileDrawer())
  }

  return (
    <Drawer
      variant={isTabletOrDown ? 'temporary' : 'permanent'}
      open={isTabletOrDown ? isMobileDrawerOpen : true}
      onClose={handleClose}
    >
      {isTabletOrDown && (
        <DrawerCloseBtn onClick={handleClose}>
          <CloseIcon />
        </DrawerCloseBtn>
      )}

      <Header>
        <Logo small={isMobile} />
      </Header>

      <Box component="section" sx={{ flexGrow: 1 }}>
        <Card component="nav" sx={{ borderRadius: 3 }}>
          <List disablePadding>
            {navigationLinks.map(link => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton
                  sx={theme => ({ padding: theme.spacing(3, 2) })}
                  onClick={() => {
                    router.push(link.href)
                  }}
                >
                  {link.icon}
                  <Typography sx={theme => ({ marginLeft: theme.spacing(2) })}>
                    {link.text}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>

      <Footer>
        <ColorThemeSelect disabled sx={{ mb: 2 }} />
        <AuthBadge />
      </Footer>
    </Drawer>
  )
}

export default NavigationMenu
