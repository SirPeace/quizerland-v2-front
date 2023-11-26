'use client'

import { Neucha, Pacifico } from 'next/font/google'

import { useEffect } from 'react'

import { getQuizzes } from '@/api/modules/quizzes'
import Quiz from '@/components/Quiz/QuizCard/QuizCard'
import {
  setQuizzes,
  setQuizzesTotalCount,
} from '@/redux/quizTitles/quizTitlesSlice'
import type { IQuizTitle } from '@/redux/quizTitles/types'
import { useAppSelector, useAppDispatch } from '@/redux/reduxHooks'

const neucha = Neucha({ subsets: ['cyrillic'], weight: '400', preload: true })
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', preload: true })

const QuizzesPage = (): JSX.Element => {
  const { quizzes, quizzesTotalCount } = useAppSelector(
    ({ quizTitlesState }) => quizTitlesState,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    getQuizzes()
      .then(data => {
        dispatch(setQuizzes(data.quizzes))
        dispatch(setQuizzesTotalCount(data.quizzesTotalCount))
        console.log(data)
      })
      .catch((err: any) => {
        console.log('Что-то пошло не так...', err)
      })
  }, [dispatch])

  return (
    <div className="max-w-4xl min-h-screen mx-auto pb-1 text-center">
      <h1 className="pt-16 pb-6 my-0 sticky top-0 bg-white z-10">
        <span className={`sm:text-3xl text-2xl ${neucha.className}`}>
          Добро пожаловать в{' '}
        </span>
        <span className={`sm:text-4xl text-3xl ${pacifico.className}`}>
          Quizerland
        </span>
      </h1>

      {quizzes.map((quiz: IQuizTitle, idx) => (
        <Quiz key={idx} quiz={quiz} />
      ))}
    </div>
  )
}

export default QuizzesPage
