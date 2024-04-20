import LightModeIcon from '@mui/icons-material/LightMode'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import { type ReactNode, useState } from 'react'

import Select, { type SelectProps } from '@/components/v2/UI/Select'

const ThemePaletteSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  borderRadius: 12,
}))
const ThemePaletteItem = styled(MenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))

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

export default function ColorThemeSelect(props: SelectProps): ReactNode {
  const [colorTheme, setColorTheme] = useState('light')

  return (
    <ThemePaletteSelect
      {...props}
      variant="solid"
      value={colorTheme}
      onChange={e => {
        setColorTheme(e.target.value as string)
      }}
    >
      {themes.map(theme => (
        <ThemePaletteItem key={theme.value} value={theme.value}>
          <LightModeIcon color="primary" sx={{ mr: 2 }} />
          {theme.text}
        </ThemePaletteItem>
      ))}
    </ThemePaletteSelect>
  )
}
