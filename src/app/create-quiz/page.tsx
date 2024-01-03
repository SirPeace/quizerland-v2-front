'use client'

import QuizForm from '@/components/CreateQuiz/QuizForm'
import QuizFormContextProvider from '@/components/CreateQuiz/QuizFormContext'

const CreateQuizPage = (): JSX.Element => (
  <QuizFormContextProvider>
    <QuizForm />
  </QuizFormContextProvider>
)

export default CreateQuizPage
