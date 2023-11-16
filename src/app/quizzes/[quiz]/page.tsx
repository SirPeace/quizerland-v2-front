'use client'

import { Paper } from '@mui/material'
import { useEffect } from 'react'

import GoToHomePageButton from '@/components/Navigation/GoToHomePageButton/GoToHomePageButton'
import QuestionCard from '@/components/Quiz/QuestionCard/QuestionCard'
import QuizResultCard from '@/components/Quiz/QuizResultCard/QuizResultCard'
import { setActiveQuiz, setIsFinishedQuiz } from '@/redux/quiz/quizSlice'

import type { IQuestion } from '@/redux/quiz/types'
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
//! Task ошибка : Неизвестный селектор при вызове с теми же параметрами возвращает другой результат. Это может привести к ненужным повторным вызовам. Селекторы, возвращающие новую ссылку (например, на объект или массив), должны быть мемоизированы:
const QuizPage = ({ params: { quiz: quizId } }: Props): JSX.Element => {
  const currentQuizId = useAppSelector(
    ({ quizState }) => quizState.activeQuizId,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setActiveQuiz(+quizId))
  }, [dispatch, quizId])

  const { quiz, currentQuestion } = useAppSelector(({ quizState }) => {
    const quiz = quizState.quizzes.find(q => q.id === currentQuizId)

    const currentQuestion = quiz?.questions.find(
      (question: IQuestion) => quiz.currentQuestionId === question.id,
    )

    return { quiz, currentQuestion }
  })

  useEffect(() => {
    if (currentQuestion === undefined) {
      dispatch(setIsFinishedQuiz())
    }
  }, [currentQuestion, dispatch])

  if (quiz === undefined) {
    return <></>
  }
  return (
    <div className="flex flex-col items-stretch max-w-4xl min-h-screen mx-auto pb-1">
      <h1 className="text-center pt-16 my-0">{quiz.title}</h1>
      <div className="mt-[10%] mb-auto">
        <GoToHomePageButton />
        <Paper elevation={8} className="mx-4 mt-3 rounded-xl">
          {currentQuestion === undefined ? (
            <QuizResultCard />
          ) : (
            <QuestionCard
              question={currentQuestion}
              questionsLength={quiz.questions.length ?? 0}
            />
          )}
        </Paper>
      </div>
    </div>
  )
}

export default QuizPage
