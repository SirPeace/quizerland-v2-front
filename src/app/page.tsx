'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { user } from '@/api/modules/auth'
import { setUser } from '@/redux/auth/authSlice'
import { useAppDispatch } from '@/redux/reduxHooks'

const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    user()
      .then(user => dispatch(setUser(user)))
      .catch((err: any) => err)
  }, [dispatch])

  useEffect(() => {
    router.push('/quizzes')
  }, [router])

  return <></>
}

export default HomePage
