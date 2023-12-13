import QuizForm from '@/components/CreateQuiz/QuizForm'
import QuizFormContextProvider from '@/components/CreateQuiz/QuizFormContext'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Создание теста | Quizerland',
  description: 'Страница создания теста',
}

const CreateQuizPage = (): JSX.Element => (
  <QuizFormContextProvider>
    <QuizForm />
  </QuizFormContextProvider>
)

export default CreateQuizPage
