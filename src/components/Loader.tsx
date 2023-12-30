import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const Loader = (): JSX.Element => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaderVisible(true)
    }, 300)
  }, [setIsLoaderVisible])

  return (
    <Box
      className="flex items-center space-x-7 text-blue-600 transition-opacity duration-300"
      sx={{ opacity: isLoaderVisible ? 1 : 0 }}
    >
      <CircularProgress color="inherit" size={40} thickness={5} />
      <Typography variant="h6">Загрузка...</Typography>
    </Box>
  )
}

export default Loader
