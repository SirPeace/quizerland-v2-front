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
	<h1 className=" pt-16 pb-6 my-0 sty sticky top-0 bg-white z-10">{quiz}</h1>
)

export default QuizPage
