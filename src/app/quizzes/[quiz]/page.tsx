'use client'

import { AxiosError } from 'axios'
import { useEffect, useState, type FC } from 'react'
import { match } from 'ts-pattern'

import { getQuiz } from '@/api/modules/quizzes'
import Loader from '@/components/Loader'
import GoToHomePageButton from '@/components/Navigation/GoToHomePageButton/GoToHomePageButton'
import QuestionCard from '@/components/Quiz/QuestionCard/QuestionCard'
import QuizPreviewCard from '@/components/Quiz/QuizPreviewCard/QuizPreviewCard'

import { resetState, setIsPreview, setupState } from '@/redux/quiz/quizSlice'
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

const QuizPage: FC<Props> = ({ params: { quiz: quizId } }) => {
  const { quiz, currentQuestion, questionsLength } = useAppSelector(
    ({ quizState }) => {
      const { questions, ...quiz } = quizState
      const currentQuestion = questions[quiz.currentQuestionIndex]
      const questionsLength = questions.length

      return {
        currentQuestion,
        questionsLength,
        quiz,
      }
    },
  )

  const [quizIdError, setQuizIdError] = useState<string>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    void getQuiz(quizId)
      .then(quiz => {
        dispatch(setupState(quiz))
      })
      .catch(err => {
        if (err instanceof AxiosError) {
          const error = err.response?.data?.message
          setQuizIdError(error)
        } else {
          setQuizIdError('Произошла ошибка, обратитесь в тех. поддержку')
        }
      })

    return () => {
      dispatch(resetState())
    }
  }, [dispatch, quizId])

  return (
    <div className="flex flex-col items-stretch max-w-4xl min-h-screen mx-auto pb-1">
      <h1 className="text-center pt-16 my-0">{quiz.title}</h1>
      <div className="mt-[10%] mb-auto">
        <GoToHomePageButton />
        <div className="mx-4 mt-3">
          {match<boolean>(true)
            .with(quizIdError !== undefined, () => <h1>{quizIdError}</h1>)
            .with(currentQuestion === undefined, () => (
              <div>
                <Loader />
              </div>
            ))
            .with(quiz.isPreview, () => <QuizPreviewCard />)
            .with(quiz.isFinished, () => <QuizPreviewCard />)
            .otherwise(() => (
              <QuestionCard
                question={currentQuestion}
                questionIndex={quiz.currentQuestionIndex}
                questionsLength={questionsLength}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default QuizPage
