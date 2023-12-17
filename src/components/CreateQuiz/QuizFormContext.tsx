'use client'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { createContext, useState } from 'react'

import { createQuiz } from '@/api/modules/quizzes'
import type { ICreateQuestionRequest } from '@/api/modules/types'
import { useAppSelector } from '@/redux/reduxHooks'

import type { Dispatch, FC, SetStateAction, ReactNode } from 'react'

export interface ICreateQuizContext {
  /** `[-1] => описание теста | [>= 0] => индекс вопроса` */
  activeTab: number
  setActiveTab: Dispatch<SetStateAction<number>>
  submit: () => void
}
export const QuizFormContext = createContext<ICreateQuizContext>({
  activeTab: 0,
  setActiveTab: () => {},
  submit: () => {},
})

const QuizFormContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(-1)

  const { title, description, questions } = useAppSelector(
    ({ quizFormState }) => {
      const title = quizFormState.quizDescription.title
      const description = quizFormState.quizDescription.description
      const questions = quizFormState.questions.map<ICreateQuestionRequest>(
        question => {
          const questionItem: ICreateQuestionRequest = {
            text: question.title,
            rightAnswerIndex: Number(question.rightAnswerId),
            answers: question.answers.map<string>(answer => answer.text),
          }
          return questionItem
        },
      )

      return { title, description, questions }
    },
  )

  const submit = async (): Promise<void> => {
    const createdQuizForm = { title, description, questions }
    console.log(createdQuizForm)

    try {
      const { id } = await createQuiz(createdQuizForm)

      router.push(`/quizzes/${id}`)
    } catch (err: any) {
      if (err instanceof AxiosError) {
        const error = err.response?.data?.message
        console.error(error)
      } else {
        console.error('Произошла ошибка, обратитесь в тех. поддержку')
      }
    }
  }

  const formContext: ICreateQuizContext = {
    activeTab,
    setActiveTab,
    submit,
  }

  return (
    <QuizFormContext.Provider value={formContext}>
      {children}
    </QuizFormContext.Provider>
  )
}

export default QuizFormContextProvider
