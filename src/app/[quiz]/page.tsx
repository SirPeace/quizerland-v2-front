'use client'

import AnswersRadioGroup from '@/components/AnswersRadioGroup/AnswersRadioGroup'

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

const QuizPage = ({ params: { quiz } }: Props): JSX.Element => {
	const quizItem = useAppSelector(({ quizState }) =>
		quizState.quizzes.find((quizItem) => quiz.includes(String(quizItem.id))),
	)

	return (
		<div className="flex flex-col items-stretch max-w-4xl min-h-screen mx-auto pb-1">
			<h1 className="text-center pt-16 my-0">{quizItem?.title}</h1>

			<div className="mx-4 mt-[10%] mb-auto bg-white rounded-xl shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)]">
				<AnswersRadioGroup quizItem={quizItem} />
			</div>
		</div>
	)
}

export default QuizPage
