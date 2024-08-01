import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'

const LoaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: theme.spacing(3),
  color: theme.palette.getContrastText(theme.palette.background.default),
  transition: 'opacity 0.3s',
}))

function Loader(): JSX.Element {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaderVisible(true)
    }, 300)
  }, [setIsLoaderVisible])

  return (
    <LoaderContainer sx={{ opacity: isLoaderVisible ? 1 : 0 }}>
      <CircularProgress color="primary" size={40} thickness={5} />
      <Typography variant="h6">Загрузка...</Typography>
    </LoaderContainer>
  )
}

export default Loader
