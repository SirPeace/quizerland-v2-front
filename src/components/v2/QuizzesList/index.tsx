import Box, { type BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { useRef, useEffect, type HTMLProps } from 'react'

import { getQuizzes } from '@/api/modules/quizzes'
import useError from '@/hooks/useError'
import { setQuizzes } from '@/redux/quizzes/quizzesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import QuizzesListItem from './QuizzesListItem'

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

const QuizzesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr '.repeat(3),
  gap: theme.spacing(3),
}))

function QuizzesList(props: BoxProps): JSX.Element {
  const { quizzes, quizzesTotalCount } = useAppSelector(
    ({ quizzesState }) => quizzesState,
  )
  const dispatch = useAppDispatch()

  const { setErrorSnackbar } = useError()

  const currentPage = useRef(0)

  useEffect(() => {
    void fetchQuizzes(0)
  }, [])

  const canLoadMoreQuizzes = (quizzesTotalCount ?? 0) > quizzes.length

  async function fetchQuizzes(page: number): Promise<void> {
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
  }

  return (
    <QuizzesGrid {...props}>
      {quizzes.map(quiz => (
        <QuizzesListItem quiz={quiz} key={quiz.id} />
      ))}

      {canLoadMoreQuizzes && (
        <IntersectingLoader
          onIntersect={() => {
            void fetchQuizzes(++currentPage.current)
          }}
        />
      )}
    </QuizzesGrid>
  )
}

export default QuizzesList
