import Box, { type BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { useRef, useCallback, useEffect, type HTMLProps } from 'react'
import useResizeObserver from 'use-resize-observer'

import { getQuizzes } from '@/api/modules/quizzes'
import useError from '@/hooks/useError'
import { setQuizzes } from '@/redux/quizzes/quizzesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

const QUIZ_CARD_WIDTH = 450
const QUIZ_CARD_HEIGHT = 320

interface LoaderProps extends HTMLProps<HTMLDivElement> {
  onIntersect: () => void
}
const IntersectingLoader = (props: LoaderProps): JSX.Element => {
  const { onIntersect, ...elementProps } = props

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  })

  useEffect(() => {
    if (entry?.isIntersecting === true) {
      onIntersect()
    }
  }, [entry?.isIntersecting])

  return (
    <div {...elementProps} ref={ref}>
      <CircularProgress size={40} thickness={6} />
    </div>
  )
}

function QuizzesInfiniteGrid(props: BoxProps): JSX.Element {
  const { quizzes, quizzesTotalCount } = useAppSelector(
    ({ quizzesState }) => quizzesState,
  )
  const dispatch = useAppDispatch()

  const { setErrorSnackbar } = useError()

  const currentPage = useRef(0)
  const listWrapperRef = useRef<HTMLDivElement>()

  const { width: listWrapperWidth = 0, height: listWrapperHeight = 0 } =
    useResizeObserver({ ref: listWrapperRef.current })

  const fetchQuizzes = useCallback(async (page: number) => {
    try {
      const response = await getQuizzes(page)
      dispatch(
        setQuizzes({
          quizzes: response.quizzes,
          totalCount: response.quizzesTotalCount,
        }),
      )
    } catch (error) {
      setErrorSnackbar(error)
    }
  }, [])

  useEffect(() => {
    void fetchQuizzes(0)
  }, [])

  const onLastItemIntersect = (): void => {
    void fetchQuizzes(++currentPage.current)
  }

  const canLoadMoreQuizzes = (quizzesTotalCount ?? 0) > quizzes.length

  return (
    <Box {...props} ref={listWrapperRef}>
      smth
    </Box>
  )
}

export default QuizzesInfiniteGrid
