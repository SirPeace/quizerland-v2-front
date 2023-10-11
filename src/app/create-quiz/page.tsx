import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Create quiz | Quizerland',
	description: 'Страница создания теста',
}

const CreateQuizPage = (): JSX.Element => (
	<h1 className="text-center">Страница создания теста</h1>
)

export default CreateQuizPage
