import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import MUISnackbar, { type SnackbarProps } from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { styled, useTheme, type Theme } from '@mui/material/styles'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'
import { type UIState, setSnackbar } from '@/redux/ui/uiSlice'

type SnackbarState = UIState['snackbar'] & {
  iconColor: string
  textColor: string
}

const transitionDuration = 300

const defaultPosition: SnackbarProps['anchorOrigin'] = {
  horizontal: 'right',
  vertical: 'top',
}

const StyledSnackbarCard = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(1),

  '& > section': {
    flexGrow: 1,
    margin: theme.spacing(0, 1),
  },
}))
const SnackbarIconWrapper = styled(Typography)({
  width: 32,
  height: 32,
  '& > *': {
    width: '100%',
    height: '100%',
  },
})

const Snackbar = (): JSX.Element => {
  const theme = useTheme()

  const snackbar = useAppSelector(({ uiState }) => uiState.snackbar)
  const dispatch = useAppDispatch()

  const [snackbarState, setSnackbarState] = useState<SnackbarState>()
  useEffect(() => {
    if (snackbar !== undefined) {
      const snackbarState = resolveSnackbarState(snackbar, theme)
      setSnackbarState(snackbarState)
    } else {
      setTimeout(() => {
        setSnackbarState(undefined)
      }, transitionDuration)
    }
  }, [snackbar])

  const closeSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setSnackbar(undefined))
  }

  return (
    <MUISnackbar
      open={snackbar !== undefined}
      anchorOrigin={snackbarState?.position ?? defaultPosition}
      autoHideDuration={snackbarState?.duration}
      transitionDuration={transitionDuration}
      onClose={closeSnackbar}
    >
      <StyledSnackbarCard>
        {undefined !== snackbarState?.icon && (
          <SnackbarIconWrapper color={snackbarState?.iconColor}>
            {snackbarState?.icon}
          </SnackbarIconWrapper>
        )}
        <section>
          <Typography variant="body2" color={snackbarState?.textColor}>
            {snackbarState?.message}
          </Typography>
        </section>
        <IconButton
          onClick={closeSnackbar}
          sx={theme => ({ ml: theme.spacing(1) })}
        >
          <CloseIcon />
        </IconButton>
      </StyledSnackbarCard>
    </MUISnackbar>
  )
}

function resolveSnackbarState(
  snackbar: NonNullable<UIState['snackbar']>,
  theme: Theme,
): SnackbarState {
  let textColor = theme.palette.getContrastText(theme.palette.background.paper)
  let iconColor = theme.palette.primary.main

  if (snackbar?.variant === 'success') {
    textColor = theme.palette.success.dark
    iconColor = theme.palette.success.main
  } else if (snackbar?.variant === 'error') {
    textColor = theme.palette.error.dark
    iconColor = theme.palette.error.main
  }

  return {
    ...snackbar,
    textColor,
    iconColor,
  }
}

export default Snackbar
