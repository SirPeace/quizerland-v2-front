'use client'

import { Box } from '@mui/material'

import Loader from '@/components/Loader'

const LoadingPage = (): JSX.Element => (
  <Box className="w-full h-screen bg-slate-100 flex justify-center items-center">
    <Loader />
  </Box>
)

export default LoadingPage
