'use client'

import { Paper } from '@mui/material'
import { useEffect } from 'react'

import { getQuiz } from '@/api/modules/quizzes'
import GoToHomePageButton from '@/components/Navigation/GoToHomePageButton/GoToHomePageButton'
import QuestionCard from '@/components/Quiz/QuestionCard/QuestionCard'
import QuizResultCard from '@/components/Quiz/QuizResultCard/QuizResultCard'

import { setIsFinishedQuiz, setup } from '@/redux/quiz/quizSlice'
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks'

import type { Metadata } from 'next'

interface Props {
  params: {
    quiz: string
  }
}

export async function generateMetadata({
  params: { quiz },
}: Props): Promise<Metadata> {
  return {
    title: `${quiz} | Quizerland`,
  }
}

const QuizPage = ({ params: { quiz: quizId } }: Props): JSX.Element => {
  const { quizTitle, currentQuestion, questionsLength } = useAppSelector(
    ({ quizState }) => {
      const currentQuestion =
        quizState.questions[quizState.currentQuestionIndex]

      const questionsLength = quizState.questions.length

      const quizTitle = quizState.title

      return { currentQuestion, questionsLength, quizTitle }
    },
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    void getQuiz(quizId).then(quiz => {
      void dispatch(setup(quiz))
    })
  }, [dispatch, quizId])

  useEffect(() => {
    if (currentQuestion === undefined) {
      dispatch(setIsFinishedQuiz())
    }
  }, [currentQuestion, dispatch])

  return (
    <div className="flex flex-col items-stretch max-w-4xl min-h-screen mx-auto pb-1">
      <h1 className="text-center pt-16 my-0">{quizTitle}</h1>
      <div className="mt-[10%] mb-auto">
        <GoToHomePageButton />
        <Paper elevation={8} className="mx-4 mt-3 rounded-xl">
          {currentQuestion === undefined ? (
            <QuizResultCard />
          ) : (
            <QuestionCard
              question={currentQuestion}
              questionsLength={questionsLength}
            />
          )}
        </Paper>
      </div>
    </div>
  )
}

export default QuizPage
