import FactCheckIcon from '@mui/icons-material/FactCheck'
import LightModeIcon from '@mui/icons-material/LightMode'
import PostAddIcon from '@mui/icons-material/PostAdd'
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Typography,
  styled,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import Card from '@/components/v2/UI/Card'
import Select from '@/components/v2/UI/Select'

const AsideWrapper = styled('aside')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 300,
  overflow: 'hidden',
  padding: theme.spacing(2),
  borderRight: '1px solid rgba(0, 0, 0, 0.1)',
}))

const Header = styled('header')(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}))

const LogoHeading = styled('h1')(({ theme }) => ({
  ...theme.typography.h1,
  textAlign: 'center',
  left: -7,
  userSelect: 'none',
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
  const router = useRouter()

  const [theme, setTheme] = useState('system')

  return (
    <AsideWrapper>
      <Header>
        <LogoHeading>Quizerland</LogoHeading>
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
          value={theme}
          onChange={e => {
            setTheme(e.target.value as string)
          }}
        >
          {themes.map(theme => (
            <ThemePaletteItem key={theme.value} value={theme.value}>
              <LightModeIcon
                color="primary"
                sx={theme => ({ marginRight: theme.spacing(2) })}
              />
              {theme.text}
            </ThemePaletteItem>
          ))}
        </ThemePaletteSelect>
        <LoginBadge>
          <Avatar sx={theme => ({ marginRight: theme.spacing(2) })} />
          <p>Вы неавторизованы</p>
        </LoginBadge>
      </Footer>
    </AsideWrapper>
  )
}

export default NavigationMenu
