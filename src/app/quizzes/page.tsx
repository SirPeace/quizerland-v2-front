'use client'

import { useWindowSize } from '@uidotdev/usehooks'
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

const LIST_ITEM_HEIGHT = 215 // px
const LIST_PADDING_X = 8 // px
const LIST_PADDING_RIGHT = LIST_PADDING_X + 16 // px
const LIST_PADDING_Y = 24 // px
const LIST_MARGIN_TOP = 112 // px

const QuizzesPage = (): JSX.Element => {
  const { quizzes } = useAppSelector(({ quizTitlesState }) => quizTitlesState)
  const dispatch = useAppDispatch()

  const quizzesCount = quizzes.length

  const { height } = useWindowSize()
  const screenHeight = height ?? document.body.clientHeight

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
    <div className="max-w-4xl min-h-screen mx-auto text-center">
      <h1 className="py-8 my-0 bg-white z-10">
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
            width="100%"
            height={screenHeight - LIST_MARGIN_TOP}
            itemSize={LIST_ITEM_HEIGHT}
            itemCount={count}
            overscanCount={5}
          >
            {({ index, style }: ListChildComponentProps) => (
              <Quiz
                key={index}
                quiz={quizzes[index]}
                itemStyle={{
                  ...style,
                  top: Number(style.top) + LIST_PADDING_Y,
                  height: Number(style.height) - LIST_PADDING_Y,
                  left: Number(style.left) + LIST_PADDING_X,
                  width: `calc(${style.width} - ${LIST_PADDING_RIGHT}px)`,
                }}
              />
            )}
          </FixedSizeList>
        ))}
    </div>
  )
}

export default QuizzesPage
