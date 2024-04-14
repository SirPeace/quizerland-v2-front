import { useMediaQuery, useTheme } from '@mui/material'

interface UseAdaptiveReturn {
  isMobile: boolean
  isTablet: boolean
  isMobileOrTablet: boolean
}
export default function useAdaptive(): UseAdaptiveReturn {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isMobileOrTablet = isMobile || isTablet

  return { isTablet, isMobile, isMobileOrTablet }
}
