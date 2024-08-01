import { useRouter, usePathname } from 'next/navigation'
import { useLayoutEffect, useMemo } from 'react'

import LoadingPage from '@/app/loading'
import { getAuthUser } from '@/redux/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import type { FC, PropsWithChildren } from 'react'

const guardedPaths = [/^\/quizzes.*$/, /^\/create-quiz.*$/]

const AuthWrapper: FC<PropsWithChildren> = ({ children: childPage }) => {
  const { isLoggedIn } = useAppSelector(({ authState }) => authState)
  const dispatch = useAppDispatch()

  const router = useRouter()
  const pathname = usePathname()

  const canViewPage = useMemo<boolean>(() => {
    if (isLoggedIn === true) {
      return true
    }

    const cannotViewPage = Boolean(guardedPaths.find(pathPattern => pathPattern.test(pathname)))
    return !cannotViewPage
  }, [pathname, isLoggedIn])

  useLayoutEffect(() => {
    void dispatch(getAuthUser())
  }, [])

  useLayoutEffect(() => {
    if (isLoggedIn === false && !canViewPage) {
      router.replace('/auth')
    }
    if (isLoggedIn === true && pathname.startsWith('/auth')) {
      router.replace('/quizzes')
    }
  }, [isLoggedIn, pathname, canViewPage, router])

  // Показываем загрузку пока не сработает редирект
  let isLoading = true
  if (isLoggedIn === true && !pathname.startsWith('/auth')) {
    isLoading = false
  } else if (isLoggedIn === false && canViewPage) {
    isLoading = false
  }

  return isLoading ? <LoadingPage /> : childPage
}

export default AuthWrapper
