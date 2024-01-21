'use client'

import QuizForm from '@/components/QuizForm'
import QuizFormContextProvider from '@/components/QuizForm/QuizFormContext'

const CreateQuizPage = (): JSX.Element => (
  <QuizFormContextProvider>
    <QuizForm />
  </QuizFormContextProvider>
)

export default CreateQuizPage
