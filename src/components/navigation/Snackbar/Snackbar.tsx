import {
  Alert,
  Box,
  IconButton,
  Snackbar as MUISnackbar,
  Typography,
  type SnackbarProps,
} from '@mui/material'

import { match } from 'ts-pattern'

import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'
import { setSnackbar } from '@/redux/ui/uiSlice'
import Close from '@mui/icons-material/Close'

const defaultPosition: SnackbarProps['anchorOrigin'] = {
  horizontal: 'right',
  vertical: 'top',
}

const Snackbar = (): JSX.Element => {
  const { snackbar } = useAppSelector(({ uiState }) => uiState)
  const dispatch = useAppDispatch()

  const close = (): void => {
    dispatch(setSnackbar(undefined))
  }

  return (
    <MUISnackbar
      open={snackbar !== undefined}
      anchorOrigin={snackbar?.position ?? defaultPosition}
      autoHideDuration={snackbar?.duration}
      onClose={close}
    >
      {match<boolean>(true)
        .with(snackbar === undefined, () => undefined)
        .with(snackbar?.alert !== undefined, () => (
          <Alert
            variant={snackbar?.alert?.variant}
            color={snackbar?.alert?.color}
            icon={snackbar?.icon}
            className="shadow-lg"
            onClose={close}
          >
            {snackbar?.message}
          </Alert>
        ))
        .otherwise(() => (
          <Box className="w-full flex justify-between bg-white shadow-lg border-solid border border-gray-300 p-1 rounded-md">
            <div className="flex items-center">
              <div className="h-6 w-6 m-2">{snackbar?.icon}</div>
              <Typography variant="body2">{snackbar?.message}</Typography>
            </div>
            <IconButton onClick={close}>
              <Close />
            </IconButton>
          </Box>
        ))}
    </MUISnackbar>
  )
}

export default Snackbar
