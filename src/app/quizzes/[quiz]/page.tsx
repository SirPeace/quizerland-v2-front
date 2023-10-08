'use client'

import QuestionCard from '@/components/QuestionCard/QuestionCard'

import type { IQuestion } from '@/redux/quiz/types'
import { useAppSelector } from '@/redux/reduxHooks'

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

const QuizPage = ({ params: { quiz: quizId } }: Props): JSX.Element => {
	const { quiz, currentQuestion } = useAppSelector(({ quizState }) => {
		const quiz = quizState.quizzes.find((q) => q.id === +quizId)

		const currentQuestion = quiz?.questions.find(
			(question: IQuestion) => quiz.currentQuestionId === question.id,
		)

		return { quiz, currentQuestion }
	})

	if (quiz === undefined) {
		return <></>
	}
	return (
		<div className="flex flex-col items-stretch max-w-4xl min-h-screen mx-auto pb-1">
			<h1 className="text-center pt-16 my-0">{quiz.title}</h1>

			<div className="mx-4 mt-[10%] mb-auto bg-white rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
				{currentQuestion === undefined ? (
					<p>Такого вопроса нет.</p>
				) : (
					<QuestionCard
						question={currentQuestion}
						questionsLength={quiz.questions.length ?? 0}
					/>
				)}
			</div>
		</div>
	)
}

export default QuizPage
