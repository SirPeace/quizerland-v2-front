import { AxiosError } from 'axios'

import { isObject } from './base'

export function getMessageFromError(error: any): string | undefined {
  if (error instanceof AxiosError) {
    const data = error.response?.data
    if (!isObject(data)) {
      return 'Произошла ошибка подключения, попробуйте позже'
    }
    // Бек отправил сообщение
    else if (typeof data.message === 'string') {
      return data.message
    }
    // Ошибки валидации
    else if (Array.isArray(data.issues)) {
      const issues = data.issues as Array<{
        message?: string
      }>
      for (const issue of issues) {
        if (issue.message !== undefined) {
          return issue.message
        }
      }
    }
  } else if (error instanceof Error) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  }
}
