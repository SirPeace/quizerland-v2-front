import QuizForm from '@/components/QuizForm'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Создание теста | Quizerland',
  description: 'Страница создания теста',
}

const CreateQuizPage = (): JSX.Element => <QuizForm />

export default CreateQuizPage
