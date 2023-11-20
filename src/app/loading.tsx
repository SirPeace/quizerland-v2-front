'use client'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

const LoadingQuizzes = (): JSX.Element => (
  <Backdrop
    open={true}
    sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
  >
    <div className="flex-col text-center">
      <CircularProgress color="inherit" />
      <p>Загрузка...</p>
    </div>
  </Backdrop>
)

export default LoadingQuizzes
