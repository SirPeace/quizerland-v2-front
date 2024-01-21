import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from 'next/link'

const GoToHomePageButton = (): JSX.Element => {
  const theme = useTheme()
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <div className={isNotMobile ? 'ml-3 mb-5' : 'w-full pt-[17%]'}>
      <Button variant="text" fullWidth size={isNotMobile ? 'medium' : 'large'}>
        <Link href="/" className="text-blue-500">
          На домашнюю страницу
        </Link>
      </Button>
    </div>
  )
}

export default GoToHomePageButton
