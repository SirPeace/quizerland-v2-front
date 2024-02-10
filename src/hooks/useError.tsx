'use client'

import ReportOutlined from '@mui/icons-material/ReportOutlined'
import merge from 'lodash-es/merge'

import { useAppDispatch } from '@/redux/reduxHooks'
import { type UIState, setSnackbar } from '@/redux/ui/uiSlice'
import { getMessageFromError } from '@/utils/error'

interface UseErrorReturn {
  setErrorSnackbar: (
    error: any,
    options?: Omit<UIState['snackbar'], 'message'>,
  ) => void
}
function useError(): UseErrorReturn {
  const dispatch = useAppDispatch()

  const setErrorSnackbar: UseErrorReturn['setErrorSnackbar'] = (
    error: any,
    options?: Omit<UIState['snackbar'], 'message'>,
  ): void => {
    const snackbarConfig: UIState['snackbar'] = {
      message: '',
      icon: <ReportOutlined />,
      duration: 3000,
      variant: 'error',
    }
    merge(snackbarConfig, options ?? {})

    const message = getMessageFromError(error)
    if (message !== undefined) {
      snackbarConfig.message = message
      dispatch(setSnackbar(snackbarConfig))
    }
  }

  return { setErrorSnackbar }
}

export default useError
