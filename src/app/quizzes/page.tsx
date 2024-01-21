'use client'

import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useWindowSize, useIntersectionObserver } from '@uidotdev/usehooks'
import { Neucha, Pacifico } from 'next/font/google'
import { type CSSProperties, useEffect, useRef } from 'react'
import { FixedSizeList, type ListChildComponentProps } from 'react-window'
import { match } from 'ts-pattern'

import { getQuizzes } from '@/api/modules/quizzes'
import QuizListItem from '@/components/Quiz/QuizListItem'
import useError from '@/hooks/useError'
import { setQuizzes, setQuizzesTotalCount } from '@/redux/quizzes/quizzesSlice'
import { useAppSelector, useAppDispatch } from '@/redux/reduxHooks'

const neucha = Neucha({ subsets: ['cyrillic'], weight: '400', preload: true })
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', preload: true })

const LIST_ITEM_HEIGHT = 270 // px
const LIST_PADDING_X = 16 // px
const LIST_PADDING_RIGHT = LIST_PADDING_X + 16 // px
const LIST_PADDING_Y = 24 // px
const LIST_MARGIN_TOP = 112 // px

interface LoaderProps {
  onIntersect: () => void
  [key: string]: any
}
const IntersectingLoader = ({
  onIntersect,
  ...props
}: LoaderProps): JSX.Element => {
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
  const theme = useTheme()
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'))

  const dispatch = useAppDispatch()
  const { quizzes, quizzesTotalCount } = useAppSelector(
    ({ quizzesState }) => quizzesState,
  )

  const { setErrorSnackbar } = useError()

  const { height } = useWindowSize()
  const screenHeight = height ?? document.body.clientHeight

  const currentPage = useRef(0)
  const quizzesCount = quizzes.length

  useEffect(() => {
    getQuizzes(0)
      .then(data => {
        dispatch(setQuizzes(data.quizzes))
        dispatch(setQuizzesTotalCount(data.quizzesTotalCount))
      })
      .catch(setErrorSnackbar)
  }, [])

  const onLastItemIntersect = (): void => {
    currentPage.current = currentPage.current + 1

    getQuizzes(currentPage.current)
      .then(data => {
        dispatch(setQuizzes(data.quizzes))
        dispatch(setQuizzesTotalCount(data.quizzesTotalCount))
      })
      .catch(setErrorSnackbar)
  }

  const canLoadMoreQuizzes = Number(quizzesTotalCount) > quizzesCount

  return (
    <div className="max-w-4xl min-h-screen mx-auto text-center">
      <h1
        className={
          isNotMobile
            ? 'py-8 my-0 bg-white z-10'
            : 'flex flex-col pt-[2rem] pb-[1rem] my-0 bg-white z-10'
        }
      >
        <span
          className={
            isNotMobile
              ? `text-3xl ${neucha.className}`
              : `text-xl  ${neucha.className}`
          }
        >
          Добро пожаловать в{' '}
        </span>
        <span
          className={
            isNotMobile
              ? `text-4xl ${pacifico.className}`
              : `text-3xl  ${pacifico.className}`
          }
        >
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
                <QuizListItem
                  quiz={quizzes[index]}
                  orderNumber={index + 1}
                  itemStyle={getStylesForListItem(style)}
                />
                {index === quizzesCount - 1 && canLoadMoreQuizzes && (
                  <IntersectingLoader
                    onIntersect={onLastItemIntersect}
                    style={getStylesForListItem(style, {
                      top:
                        Number(style.top) +
                        LIST_PADDING_Y +
                        Number(style.height),
                      height: 70,
                    })}
                  />
                )}
              </>
            )}
          </FixedSizeList>
        ))}
    </div>
  )
}

function getStylesForListItem(
  itemStyles: CSSProperties,
  overload?: CSSProperties,
): CSSProperties {
  let styles: CSSProperties = {
    ...itemStyles,
    top: Number(itemStyles.top) + LIST_PADDING_Y,
    height: Number(itemStyles.height) - LIST_PADDING_Y,
    left: Number(itemStyles.left) + LIST_PADDING_X,
    width: `calc(${itemStyles.width} - ${LIST_PADDING_RIGHT}px)`,
  }

  if (undefined !== overload) {
    styles = { ...styles, ...overload }
  }

  return styles
}

export default QuizzesPage
