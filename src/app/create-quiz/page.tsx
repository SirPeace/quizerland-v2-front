import CreateQuiz from '@/components/CreateQuiz/CreateQuiz'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Создание теста | Quizerland',
  description: 'Страница создания теста',
}

const CreateQuizPage = (): JSX.Element => <CreateQuiz />

export default CreateQuizPage
