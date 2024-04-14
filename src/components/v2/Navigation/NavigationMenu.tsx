'use client'

import CloseIcon from '@mui/icons-material/Close'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import LightModeIcon from '@mui/icons-material/LightMode'
import PostAddIcon from '@mui/icons-material/PostAdd'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import MUIDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Logo from '@/components/v2/Logo'
import Card from '@/components/v2/UI/Card'
import Select from '@/components/v2/UI/Select'
import useAdaptive from '@/hooks/useAdaptive'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'
import { closeMobileDrawer } from '@/redux/ui/uiSlice'

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
const ThemePaletteSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  borderRadius: 12,
}))
const ThemePaletteItem = styled(MenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))
const LoginBadge = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,

  '> p': {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,

    '> em': {
      color: theme.palette.info.main,
      fontStyle: 'normal',
      fontWeight: 700,
    },
  },
}))

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

const themes = [
  {
    value: 'light',
    text: 'Светлая тема',
  },
  {
    value: 'dark',
    text: 'Темная тема',
  },
  {
    value: 'system',
    text: 'Системная тема',
  },
]

function NavigationMenu(): JSX.Element {
  const { user } = useAppSelector(({ authState }) => authState)
  const { isMobileDrawerOpen } = useAppSelector(({ uiState }) => uiState)
  const dispatch = useAppDispatch()

  const { isMobileOrTablet, isMobile } = useAdaptive()

  const router = useRouter()

  const [colorTheme, setColorTheme] = useState('system')

  function handleClose(): void {
    dispatch(closeMobileDrawer())
  }

  return (
    <Drawer
      variant={isMobileOrTablet ? 'temporary' : 'permanent'}
      open={isMobileOrTablet ? isMobileDrawerOpen : true}
      onClose={handleClose}
    >
      {isMobileOrTablet && (
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
        <ThemePaletteSelect
          variant="solid"
          value={colorTheme}
          onChange={e => {
            setColorTheme(e.target.value as string)
          }}
        >
          {themes.map(theme => (
            <ThemePaletteItem key={theme.value} value={theme.value}>
              <LightModeIcon color="primary" sx={theme => ({ marginRight: theme.spacing(2) })} />
              {theme.text}
            </ThemePaletteItem>
          ))}
        </ThemePaletteSelect>
        <LoginBadge>
          {user === undefined ? (
            <>
              <Avatar sx={theme => ({ marginRight: theme.spacing(2) })} />
              <span>Вы неавторизованы</span>
            </>
          ) : (
            <>
              <Avatar
                sx={theme => ({ marginRight: theme.spacing(2) })}
                src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${user.nickname}`}
              />
              <p>
                <span>Пользователь:</span>
                <br />
                <em>@{user.nickname}</em>
              </p>
            </>
          )}
        </LoginBadge>
      </Footer>
    </Drawer>
  )
}

export default NavigationMenu
