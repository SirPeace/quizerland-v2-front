'use client'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'

const LoadingPage = (): JSX.Element => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaderVisible(true)
    }, 300)
  }, [setIsLoaderVisible])

  return (
    <Box className="w-full h-screen bg-slate-100 flex justify-center items-center">
      <Box
        className="flex items-center space-x-7 text-blue-600 transition-opacity duration-300"
        sx={{ opacity: isLoaderVisible ? 1 : 0 }}
      >
        <CircularProgress color="inherit" size={40} thickness={5} />
        <Typography variant="h6">Загрузка...</Typography>
      </Box>
    </Box>
  )
}

export default LoadingPage
