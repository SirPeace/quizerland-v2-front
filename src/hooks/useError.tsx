'use client'

import ReportOutlined from '@mui/icons-material/ReportOutlined'
import { AxiosError } from 'axios'
import { isPlainObject } from 'lodash-es'

import { useAppDispatch } from '@/redux/reduxHooks'
import { type UIState, setSnackbar } from '@/redux/ui/uiSlice'

const isObject = (value: unknown): value is Record<string, unknown> =>
  isPlainObject(value)

const getMessageFromError = (error: any): string | undefined => {
  if (error instanceof AxiosError) {
    const data = error.response?.data
    if (isObject(data) && typeof data.message === 'string') {
      return data.message
    }
  } else if (error instanceof Error) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  }
}

interface UseErrorReturn {
  setErrorSnackbar: (error: any) => void
}
const useError = (): UseErrorReturn => {
  const dispatch = useAppDispatch()

  const setErrorSnackbar = (error: any): void => {
    const snackbar: UIState['snackbar'] = {
      message: '',
      icon: <ReportOutlined />,
      duration: 3000,
      alert: {
        color: 'error',
        variant: 'outlined',
      },
    }

    const message = getMessageFromError(error)
    if (message !== undefined) {
      snackbar.message = message
      dispatch(setSnackbar(snackbar))
    }
  }

  return { setErrorSnackbar }
}

export default useError
