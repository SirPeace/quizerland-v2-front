'use client'

import { createContext, useState } from 'react'

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
  const [activeTab, setActiveTab] = useState(-1)
  const quizForm = useAppSelector(({ quizFormState }) => quizFormState)

  const submit = async (): Promise<void> => {
    console.debug('form submitted: ', quizForm)
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

// https://stackoverflow.com/questions/70394537/how-to-set-array-in-useform-and-validate-the-length-of-value
