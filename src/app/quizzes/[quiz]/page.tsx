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

const QuizPage = ({ params: { quiz } }: Props): JSX.Element => (
	<h1 className="text-center">Страница {quiz}</h1>
)

export default QuizPage
