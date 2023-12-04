'use client'

import CircularProgress from '@mui/material/CircularProgress'
import { useWindowSize, useIntersectionObserver } from '@uidotdev/usehooks'
import { Neucha, Pacifico } from 'next/font/google'

import { useEffect, useRef } from 'react'

import { FixedSizeList, type ListChildComponentProps } from 'react-window'

import { match } from 'ts-pattern'

import { getQuizzes } from '@/api/modules/quizzes'
import Quiz from '@/components/Quiz/QuizCard/QuizCard'
import { setQuizzes, setQuizzesTotalCount } from '@/redux/quizzes/quizzesSlice'

import { useAppSelector, useAppDispatch } from '@/redux/reduxHooks'

const neucha = Neucha({ subsets: ['cyrillic'], weight: '400', preload: true })
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', preload: true })

const LIST_ITEM_HEIGHT = 215 // px
const LIST_PADDING_X = 8 // px
const LIST_PADDING_RIGHT = LIST_PADDING_X + 16 // px
const LIST_PADDING_Y = 24 // px
const LIST_MARGIN_TOP = 112 // px

interface LoaderProps {
  onIntersect: () => void
  [key: string]: any
}
const Loader = ({ onIntersect, ...props }: LoaderProps): JSX.Element => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  })

  useEffect(() => {
    if (entry?.isIntersecting === true) {
      onIntersect?.()
    }
  }, [entry?.isIntersecting, onIntersect])

  return (
    <div {...props} ref={ref}>
      <CircularProgress size={40} thickness={6} />
    </div>
  )
}

const QuizzesPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { height } = useWindowSize()
  const { quizzes, quizzesTotalCount } = useAppSelector(
    ({ quizzesState }) => quizzesState,
  )

  const screenHeight = height ?? document.body.clientHeight

  const setCurrentPage = useRef(0)
  const quizzesCount = quizzes.length
  // если список тестов не пуст && кол-во тестов в DB больше чем в REDUX
  // можно отобразить Loader && получить больше тестов
  const isGoToQuizzesRequest =
    quizzesTotalCount !== null && quizzesTotalCount > quizzesCount

  // =======================================
  // ======= Первый запрос при входе =======
  // =======================================

  useEffect(() => {
    getQuizzes(0)
      .then(data => {
        dispatch(setQuizzes(data.quizzes))
        dispatch(setQuizzesTotalCount(data.quizzesTotalCount))
      })
      .catch((err: any) => {
        console.error('Что-то пошло не так...', err)
      })
  }, [dispatch])

  // =======================================
  //  Повторный запрос IntersectionObserver
  // =======================================

  const onLastItemIntersect = (): void => {
    setCurrentPage.current = setCurrentPage.current + 1

    getQuizzes(setCurrentPage.current)
      .then(data => {
        dispatch(setQuizzes(data.quizzes))
        dispatch(setQuizzesTotalCount(data.quizzesTotalCount))
      })
      .catch((err: any) => {
        console.error('Что-то пошло не так...', err)
      })
  }

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
            className="pb-3"
          >
            {({ index, style }: ListChildComponentProps) => (
              <>
                <Quiz
                  quiz={quizzes[index]}
                  orderNumber={index + 1}
                  itemStyle={{
                    ...style,
                    top: Number(style.top) + LIST_PADDING_Y,
                    height: Number(style.height) - LIST_PADDING_Y,
                    left: Number(style.left) + LIST_PADDING_X,
                    width: `calc(${style.width} - ${LIST_PADDING_RIGHT}px)`,
                  }}
                />
                {index === quizzesCount - 1 && isGoToQuizzesRequest && (
                  <Loader
                    onIntersect={onLastItemIntersect}
                    style={{
                      ...style,
                      top:
                        Number(style.top) +
                        LIST_PADDING_Y +
                        Number(style.height),
                      height: 70,
                      left: Number(style.left) + LIST_PADDING_X,
                      width: `calc(${style.width} - ${LIST_PADDING_RIGHT}px)`,
                    }}
                  />
                )}
              </>
            )}
          </FixedSizeList>
        ))}
    </div>
  )
}

export default QuizzesPage
