import { useMediaQuery, useTheme } from '@mui/material'

interface UseAdaptiveReturn {
  isMobile: boolean
  isTablet: boolean
  isTabletOrDown: boolean
}
export default function useAdaptive(): UseAdaptiveReturn {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isTabletOrDown = useMediaQuery(theme.breakpoints.down('md'))

  return { isTablet, isMobile, isTabletOrDown }
}
