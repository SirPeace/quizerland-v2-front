'use client'

import { Neucha, Pacifico } from 'next/font/google'

import Quiz from '@/components/Quiz/Quiz'
import { useAppSelector } from '@/redux/reduxHooks'

const neucha = Neucha({ subsets: ['cyrillic'], weight: '400', preload: true })
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', preload: true })

const HomePage = (): JSX.Element => {
	const quizzes = useAppSelector(({ quizState }) => quizState.quizzes)

	return (
		<div className="max-w-4xl min-h-screen mx-auto pb-1 text-center">
			<h1 className="pt-16 pb-6 my-0 sty sticky top-0 bg-white z-10">
				<span className={`sm:text-3xl text-2xl ${neucha.className}`}>
					Добро пожаловать в{' '}
				</span>
				<span className={`sm:text-4xl text-3xl ${pacifico.className}`}>
					Quizerland
				</span>
			</h1>

			{quizzes.map((quiz) => (
				<Quiz key={quiz.id} quiz={quiz} />
			))}
		</div>
	)
}

export default HomePage
