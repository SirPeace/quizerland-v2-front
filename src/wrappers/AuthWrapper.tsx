import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'

import { getAuthUser } from '@/api/modules/auth'
import LoadingPage from '@/app/loading'
import { setUser, unsetUser } from '@/redux/auth/authSlice'
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

    const guardedPath = guardedPaths.find(pathPattern =>
      pathPattern.test(pathname),
    )
    if (undefined === guardedPath) {
      return true
    }

    return false
  }, [pathname, isLoggedIn])

  // TODO: Переделать на actions
  useEffect(() => {
    void getAuthUser()
      .then(user => {
        dispatch(setUser(user))
      })
      .catch(() => {
        dispatch(unsetUser())
      })
  }, [dispatch])

  useEffect(() => {
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
