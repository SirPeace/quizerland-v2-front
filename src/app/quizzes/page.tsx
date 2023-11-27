'use client'

import { Neucha, Pacifico } from 'next/font/google'

import { useEffect } from 'react'

import { FixedSizeList, type ListChildComponentProps } from 'react-window'

import { match } from 'ts-pattern'

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
  const { quizzes } = useAppSelector(({ quizTitlesState }) => quizTitlesState)
  const dispatch = useAppDispatch()

  const quizzesCount = quizzes.length

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

      {match(quizzesCount)
        .with(0, () => <p>Нет ни одного теста. Создайте что-нибудь.</p>)
        .otherwise(count => (
          <FixedSizeList
            height={700} // TODO: Переделать на https://usehooks.com/usewindowsize
            width={800} // TODO: Переделать на https://usehooks.com/usewindowsize
            itemSize={215} // TODO: Подумать, как нормально зафиксировать высоту элемента
            itemCount={count}
            overscanCount={5}
          >
            {({ index, style }: ListChildComponentProps) => (
              <Quiz
                key={index}
                quiz={quizzes[index]}
                itemStyle={{
                  ...style,
                  top: Number(style.top) + 24,
                  height: Number(style.height) - 24,
                  left: Number(style.left) + 8,
                  width: `calc(${style.width} - ${20}px)`,
                }}
              />
            )}
          </FixedSizeList>
        ))}
    </div>
  )
}

export default QuizzesPage
