'use client'

import { useEffect } from 'react'

import { match } from 'ts-pattern'

import { getQuiz } from '@/api/modules/quizzes'
import Loader from '@/components/Loader'
import GoToHomePageButton from '@/components/Navigation/GoToHomePageButton/GoToHomePageButton'
import QuestionCard from '@/components/Quiz/QuestionCard/QuestionCard'
import QuizResultCard from '@/components/Quiz/QuizResultCard/QuizResultCard'

import { setupState } from '@/redux/quiz/quizSlice'
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
  const {
    quizTitle,
    currentQuestion,
    currentQuestionIndex,
    questionsLength,
    isFinished,
  } = useAppSelector(({ quizState }) => {
    const currentQuestionIndex = quizState.currentQuestionIndex
    const currentQuestion = quizState.questions[currentQuestionIndex]
    const questionsLength = quizState.questions.length
    const quizTitle = quizState.title
    const isFinished = quizState.isFinished

    return {
      currentQuestion,
      questionsLength,
      quizTitle,
      currentQuestionIndex,
      isFinished,
    }
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    void getQuiz(quizId).then(quiz => {
      void dispatch(setupState(quiz))
    })
  }, [dispatch, quizId])

  return (
    <div className="flex flex-col items-stretch max-w-4xl min-h-screen mx-auto pb-1">
      <h1 className="text-center pt-16 my-0">{quizTitle}</h1>
      <div className="mt-[10%] mb-auto">
        <GoToHomePageButton />
        <div className="mx-4 mt-3">
          {match<boolean>(true)
            .with(currentQuestion === undefined, () => (
              <div>
                <Loader />
              </div>
            ))
            .with(isFinished, () => <QuizResultCard />)
            .otherwise(() => (
              <QuestionCard
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
                questionsLength={questionsLength}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default QuizPage
