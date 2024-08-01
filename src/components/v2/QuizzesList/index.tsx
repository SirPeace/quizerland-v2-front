import CircularProgress from '@mui/material/CircularProgress'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { useEffect, type HTMLProps } from 'react'

import useAdaptive from '@/hooks/useAdaptive'
import useError from '@/hooks/useError'
import { fetchQuizzes, fetchMoreQuizzes, dropQuizzesState } from '@/redux/quizzes/quizzesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import QuizzesGrid from './QuizzesGrid'
import QuizzesListItem from './QuizzesListItem'

import type { BoxProps } from '@mui/material/Box'

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

function QuizzesList(props: BoxProps): JSX.Element {
  const { quizzes, quizzesTotalCount } = useAppSelector(({ quizzesState }) => quizzesState)
  const dispatch = useAppDispatch()

  const { setErrorSnackbar } = useError()

  const { isMobile } = useAdaptive()

  useEffect(() => {
    void dispatch(fetchQuizzes()).then(result => {
      if ('error' in result) {
        setErrorSnackbar(
          result.payload ?? 'Произошла непредвиденная ошибка, обратитесь в тех. поддержку',
        )
      }
    })

    return () => {
      dispatch(dropQuizzesState())
    }
  }, [])

  const canLoadMoreQuizzes = (quizzesTotalCount ?? 0) > quizzes.length

  async function handleLoaderIntersection(): Promise<void> {
    const result = await dispatch(fetchMoreQuizzes())
    if ('error' in result) {
      setErrorSnackbar(
        result.payload ?? 'Произошла непредвиденная ошибка, обратитесь в тех. поддержку',
      )
    }
  }

  return (
    <QuizzesGrid {...props}>
      {quizzes.map(quiz => (
        <QuizzesListItem quiz={quiz} compact={isMobile} key={quiz.id} />
      ))}

      {canLoadMoreQuizzes && (
        <IntersectingLoader
          onIntersect={() => {
            void handleLoaderIntersection()
          }}
        />
      )}
    </QuizzesGrid>
  )
}

export default QuizzesList
